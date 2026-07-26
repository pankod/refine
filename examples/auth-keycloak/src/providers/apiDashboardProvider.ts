import { DataProvider } from "@refinedev/core";
import axios from "axios";

// Dùng biến môi trường nếu có, nếu không thì dùng đường dẫn tương đối /api (dành cho production Ingress)
const API_URL = import.meta.env.VITE_API_URL || "/api";

export const apiDashboardProvider: DataProvider = {
  getList: async ({ resource }) => {
    if (resource === "dashboards") {
      const response = await axios.get(`${API_URL}/dashboards`);
      return { data: response.data, total: response.data.length };
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
