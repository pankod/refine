import { DataProvider } from "@refinedev/core";
import axios from "axios";
import Keycloak from "keycloak-js";
import { getListTotal, toList } from "./listResponse";

export const keycloakDataProvider = (keycloak: Keycloak): DataProvider => {
  const getHeaders = () => ({
    Authorization: `Bearer ${keycloak.token}`,
    "Content-Type": "application/json",
  });

  const getBaseUrl = () => {
    const baseUrl = keycloak.authServerUrl?.replace(/\/$/, "");
    return `${baseUrl}/admin/realms/${keycloak.realm}`;
  };

  return {
    getList: async ({ resource, pagination, filters, sorters }) => {
      const url = `${getBaseUrl()}/${resource}`;
      
      const params: any = {};
      
      // Map Refine pagination to Keycloak first/max
      if (pagination) {
        const { currentPage = 1, pageSize = 10 } = pagination;
        params.first = (currentPage - 1) * pageSize;
        params.max = pageSize;
      }

      // Simple filter mapping (Keycloak supports search parameter)
      if (filters && filters.length > 0) {
        // Find if there is a 'q' or 'search' filter
        const searchFilter = filters.find((f: any) => f.field === "q" || f.field === "search");
        if (searchFilter) {
          params.search = searchFilter.value;
        }
      }

      try {
        const response = await axios.get(url, {
          headers: getHeaders(),
          params,
        });
        const data = toList<any>(response.data);

        // Map Keycloak user to match Table columns
        const mappedData = await Promise.all(data.map(async (item: any) => {
          let role = "User"; // Mặc định nếu không lấy được
          if (resource === "users") {
            try {
              // Lấy role mappings của mỗi user
              const rolesRes = await axios.get(`${url}/${item.id}/role-mappings/realm`, {
                headers: getHeaders()
              });
              // Trích xuất tên role, bỏ qua các role mặc định hệ thống như 'uma_authorization', 'offline_access' nếu muốn
              const rolesList = rolesRes.data
                .map((r: any) => r.name)
                .filter((name: string) => name !== "uma_authorization" && name !== "offline_access" && name !== "default-roles-" + keycloak.realm);
              
              if (rolesList.length > 0) {
                role = rolesList.join(", ");
              }
            } catch (e) {
              console.warn(`Failed to fetch roles for user ${item.id}`, e);
            }
          }

          let name = item.name;
          if (resource === "users") {
            name = item.firstName || item.lastName 
              ? `${item.firstName || ""} ${item.lastName || ""}`.trim() 
              : item.username;
          }

          let description = item.description;
          if (resource === "roles" && description?.startsWith("${")) {
             const key = description.replace("${", "").replace("}", "");
             const translations: Record<string, string> = {
                "role_admin": "Quản trị viên hệ thống",
                "role_create-realm": "Quyền tạo Realm mới",
                "role_default-roles": "Vai trò mặc định",
                "role_offline-access": "Cho phép truy cập ngoại tuyến (Offline Access)",
                "role_uma_authorization": "Quyền quản lý UMA Authorization"
             };
             description = translations[key] || description;
          }

          return {
            ...item,
            name,
            description,
            role,
          };
        }));

        // Keycloak admin API doesn't return total count easily without an extra call
        // We will do a separate call to /users/count if resource is users
        let total = getListTotal(response.data, data.length);
        if (resource === "users") {
          try {
            const countRes = await axios.get(`${url}/count`, {
              headers: getHeaders(),
              params: { search: params.search }
            });
            total = countRes.data;
          } catch (e) {
            console.warn("Failed to fetch count", e);
          }
        }

        return {
          data: mappedData,
          total,
        };
      } catch (error) {
        console.error("Keycloak DataProvider getList error:", error);
        throw error;
      }
    },

    getMany: async () => ({ data: [] }),
    
    getOne: async ({ resource, id }) => {
      const url = `${getBaseUrl()}/${resource}/${id}`;
      const { data } = await axios.get(url, { headers: getHeaders() });
      return { data };
    },
    
    create: async () => ({ data: {} as any }),
    update: async () => ({ data: {} as any }),
    deleteOne: async () => ({ data: {} as any }),
    getApiUrl: () => getBaseUrl(),
  };
};
