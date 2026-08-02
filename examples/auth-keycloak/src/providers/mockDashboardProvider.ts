import { DataProvider } from "@refinedev/core";

const getMockDashboards = (): any[] => {
  const data = localStorage.getItem("mock_dashboards");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
  return [];
};

const saveMockDashboards = (dashboards: any[]) => {
  localStorage.setItem("mock_dashboards", JSON.stringify(dashboards));
};

export const mockDashboardProvider: DataProvider = {
  getList: async ({ resource }) => {
    if (resource === "dashboards") {
      const dashboards = getMockDashboards();
      return { data: dashboards, total: dashboards.length };
    }
    return { data: [], total: 0 };
  },
  getMany: async () => ({ data: [] }),
  getOne: async ({ resource, id }) => {
    if (resource === "dashboards") {
      const dashboards = getMockDashboards();
      const dashboard = dashboards.find(d => d.id === id);
      return { data: dashboard as any };
    }
    return { data: {} as any };
  },
  create: async ({ resource, variables }: any) => {
    if (resource === "dashboards") {
      const dashboards = getMockDashboards();
      const newDashboard = {
        id: Math.random().toString(36).substring(2, 10),
        ...variables,
        createdAt: new Date().toISOString()
      };
      dashboards.push(newDashboard);
      saveMockDashboards(dashboards);
      return { data: newDashboard };
    }
    return { data: {} as any };
  },
  update: async ({ resource, id, variables }: any) => {
    if (resource === "dashboards") {
      const dashboards = getMockDashboards();
      const index = dashboards.findIndex(d => d.id === id);
      if (index !== -1) {
        dashboards[index] = { ...dashboards[index], ...variables };
        saveMockDashboards(dashboards);
        return { data: dashboards[index] };
      }
    }
    return { data: {} as any };
  },
  deleteOne: async ({ resource, id }: any) => {
    if (resource === "dashboards") {
      const dashboards = getMockDashboards();
      const filtered = dashboards.filter(d => d.id !== id);
      saveMockDashboards(filtered);
      return { data: { id } as any };
    }
    return { data: {} as any };
  },
  getApiUrl: () => "",
};
