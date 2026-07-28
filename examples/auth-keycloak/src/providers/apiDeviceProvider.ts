import { DataProvider } from "@refinedev/core";
import axios from "axios";

// Dùng biến môi trường nếu có, nếu không thì dùng đường dẫn tương đối /api (dành cho production Ingress)
const API_URL = import.meta.env.VITE_API_URL || "/api";

export const apiDeviceProvider: DataProvider = {
  getList: async ({ resource, pagination, filters }) => {
    if (resource === "devices") {
      const params: any = {};
      if (pagination) {
        params.page = pagination.current || 1;
        params.limit = pagination.pageSize || 10;
      }
      
      if (filters && filters.length > 0) {
        filters.forEach((filter: any) => {
          if (filter.field === 'isGateway' && filter.operator === 'eq') {
            params.isGateway = filter.value;
          }
        });
      }
      
      const response = await axios.get(`${API_URL}/devices`, { params });
      const total = parseInt(response.headers['x-total-count'] || '0', 10) || response.data.length;
      return { data: response.data, total };
    }
    return { data: [], total: 0 };
  },
  getMany: async () => ({ data: [] }),
  getOne: async ({ resource, id }) => {
    if (resource === "devices") {
      const response = await axios.get(`${API_URL}/devices/${id}`);
      return { data: response.data };
    }
    return { data: {} as any };
  },
  create: async ({ resource, variables }: any) => {
    if (resource === "devices") {
      const response = await axios.post(`${API_URL}/devices`, variables);
      return { data: response.data };
    }
    return { data: {} as any };
  },
  update: async ({ resource, id, variables }: any) => {
    if (resource === "devices") {
      const response = await axios.patch(`${API_URL}/devices/${id}`, variables);
      return { data: response.data };
    }
    return { data: {} as any };
  },
  deleteOne: async ({ resource, id }: any) => {
    if (resource === "devices") {
      await axios.delete(`${API_URL}/devices/${id}`);
      return { data: { id } as any };
    }
    return { data: {} as any };
  },
  getApiUrl: () => API_URL,
  custom: async ({ url, method, payload }) => {
    if (url.includes("/attributes")) {
      return { data: { server: [], shared: [], client: [] } } as any;
    }
    try {
      const response = await axios({
        method,
        url: `${API_URL}/${url}`,
        data: payload
      });
      return { data: response.data } as any;
    } catch (err) {
      throw err;
    }
  },
};
