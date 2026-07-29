import { DataProvider } from "@refinedev/core";
import axios from "axios";
import { getListTotal, toList } from "./listResponse";

// Dùng biến môi trường nếu có, nếu không thì dùng đường dẫn tương đối /api (dành cho production Ingress)
const API_URL = import.meta.env.VITE_API_URL || "/api";

export const apiDashboardProvider: DataProvider = {
  getList: async ({ resource, pagination }) => {
    if (resource === "dashboards") {
      const params: any = {};
      if (pagination) {
        params.page = pagination.currentPage || 1;
        params.limit = pagination.pageSize || 10;
      }
      const response = await axios.get(`${API_URL}/dashboards`, { params });
      const data = toList(response.data);
      const headerTotal = parseInt(response.headers['x-total-count'] || '0', 10);
      const total = headerTotal || getListTotal(response.data, data.length);
      return { data, total };
    }
    return { data: [], total: 0 };
  },
  getMany: async () => ({ data: [] }),
  getOne: async ({ resource, id }) => {
    if (resource === "dashboards") {
      const response = await axios.get(`${API_URL}/dashboards/${id}`);
      return { data: response.data };
    }
    return { data: {} as any };
  },
  create: async ({ resource, variables }: any) => {
    if (resource === "dashboards") {
      const response = await axios.post(`${API_URL}/dashboards`, variables);
      return { data: response.data };
    }
    return { data: {} as any };
  },
  update: async ({ resource, id, variables }: any) => {
    if (resource === "dashboards") {
      const response = await axios.patch(`${API_URL}/dashboards/${id}`, variables);
      return { data: response.data };
    }
    return { data: {} as any };
  },
  deleteOne: async ({ resource, id }: any) => {
    if (resource === "dashboards") {
      await axios.delete(`${API_URL}/dashboards/${id}`);
      return { data: { id } as any };
    }
    return { data: {} as any };
  },
  getApiUrl: () => API_URL,
  custom: async () => {
    return { data: {} as any };
  }
};
