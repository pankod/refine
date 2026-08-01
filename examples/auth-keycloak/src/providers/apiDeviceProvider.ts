import { DataProvider } from "@refinedev/core";
import axios from "axios";
import { getListTotal, toList } from "./listResponse";

// Dùng biến môi trường nếu có, nếu không thì dùng đường dẫn tương đối /api (dành cho production Ingress)
const API_URL = import.meta.env.VITE_API_URL || "/api";

export const apiDeviceProvider: DataProvider = {
  getList: async ({ resource, pagination, filters }) => {
    if (resource === "devices" || resource === "gateways") {
      const params: any = {};
      if (resource === "gateways") params.gateway = true;
      if (pagination) {
        params.page = pagination.currentPage || 1;
        params.limit = pagination.pageSize || 10;
      }
      
      if (filters && filters.length > 0) {
        filters.forEach((filter: any) => {
          if ((filter.field === 'gateway' || filter.field === 'isGateway') && filter.operator === 'eq') {
            params.gateway = filter.value;
          }
          if (filter.field === 'name' && filter.operator === 'contains' && filter.value) {
            params.search = filter.value;
          }
        });
      }
      
      const response = await axios.get(`${API_URL}/devices`, { params });
      const data = toList(response.data);
      const headerTotal = parseInt(response.headers['x-total-count'] || '0', 10);
      const total = headerTotal || getListTotal(response.data, data.length);
      return { data, total };
    }
    return { data: [], total: 0 };
  },
  getMany: async () => ({ data: [] }),
  getOne: async ({ resource, id }) => {
    if (resource === "devices" || resource === "gateways") {
      const response = await axios.get(`${API_URL}/devices/${id}`);
      return { data: response.data };
    }
    return { data: {} as any };
  },
  create: async ({ resource, variables }: any) => {
    if (resource === "devices" || resource === "gateways") {
      const payload = resource === "gateways" ? { ...variables, gateway: true } : variables;
      const response = await axios.post(`${API_URL}/devices`, payload);
      return { data: response.data };
    }
    return { data: {} as any };
  },
  update: async ({ resource, id, variables }: any) => {
    if (resource === "devices" || resource === "gateways") {
      const response = await axios.patch(`${API_URL}/devices/${id}`, variables);
      return { data: response.data };
    }
    return { data: {} as any };
  },
  deleteOne: async ({ resource, id }: any) => {
    if (resource === "devices" || resource === "gateways") {
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
