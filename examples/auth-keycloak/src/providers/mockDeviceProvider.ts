import { DataProvider } from "@refinedev/core";

const getMockDevices = (): any[] => {
  const data = localStorage.getItem("mock_devices");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
  return [];
};

const saveMockDevices = (devices: any[]) => {
  localStorage.setItem("mock_devices", JSON.stringify(devices));
};

const getMockAttributes = (): Record<string, any> => {
  const data = localStorage.getItem("mock_attributes");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  }
  return {};
};

const saveMockAttributes = (attributes: Record<string, any>) => {
  localStorage.setItem("mock_attributes", JSON.stringify(attributes));
};

const getMockTelemetry = (): Record<string, any> => {
  const data = localStorage.getItem("mock_telemetry");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  }
  return {};
};

const saveMockTelemetry = (telemetry: Record<string, any>) => {
  localStorage.setItem("mock_telemetry", JSON.stringify(telemetry));
};

export const mockDeviceProvider: DataProvider = {
  getList: async ({ resource }) => {
    if (resource === "devices") {
      const devices = getMockDevices();
      return { data: devices, total: devices.length };
    }
    return { data: [], total: 0 };
  },
  getMany: async () => ({ data: [] }),
  getOne: async ({ resource, id }) => {
    if (resource === "devices") {
      const devices = getMockDevices();
      const device = devices.find(d => d.id === id);
      return { data: device as any };
    }
    return { data: {} as any };
  },
  create: async ({ resource, variables }: any) => {
    if (resource === "devices") {
      // Hàm tạo chuỗi ngẫu nhiên chuẩn bảo mật (alphanumeric)
      const generateSecureToken = (length: number) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const randomArray = new Uint8Array(length);
        crypto.getRandomValues(randomArray);
        for (let i = 0; i < length; i++) {
          result += chars[randomArray[i] % chars.length];
        }
        return result;
      };

      const newDevice = {
        id: Math.random().toString(36).substring(2, 10),
        ...variables,
        status: "offline", // mặc định thiết bị mới tạo là offline
        device_key: generateSecureToken(20), // 20 ký tự (chuẩn Access Token ThingsBoard)
        secret: generateSecureToken(32), // 32 ký tự (chuẩn mật khẩu / MQTT secret)
        createdTime: new Date().toISOString()
      };
      
      const devices = getMockDevices();
      devices.push(newDevice);
      saveMockDevices(devices);
      
      const attributes = getMockAttributes();
      attributes[newDevice.id] = { server: [], shared: [], client: [] };
      saveMockAttributes(attributes);
      
      const telemetry = getMockTelemetry();
      telemetry[newDevice.id] = [];
      saveMockTelemetry(telemetry);
      
      return { data: newDevice };
    }
    return { data: {} as any };
  },
  update: async ({ resource, id, variables }: any) => {
    if (resource === "devices") {
      const devices = getMockDevices();
      const index = devices.findIndex(d => d.id === id);
      if (index !== -1) {
        devices[index] = { ...devices[index], ...variables };
        saveMockDevices(devices);
        return { data: devices[index] };
      }
    }
    return { data: {} as any };
  },
  deleteOne: async ({ resource, id }: any) => {
    if (resource === "devices") {
      const devices = getMockDevices();
      const index = devices.findIndex(d => d.id === id);
      if (index !== -1) {
        devices.splice(index, 1);
        saveMockDevices(devices);
        
        const attributes = getMockAttributes();
        delete attributes[id];
        saveMockAttributes(attributes);
        
        const telemetry = getMockTelemetry();
        delete telemetry[id];
        saveMockTelemetry(telemetry);
        
        return { data: { id } as any };
      }
    }
    return { data: {} as any };
  },
  getApiUrl: () => "",
  custom: async ({ url, method }) => {
    // Giả lập API cho attributes và telemetry
    if (url.includes("/attributes")) {
      const id = url.split("/")[1]; // format: devices/1/attributes
      const attributes = getMockAttributes();
      return { data: attributes[id] || { server: [], shared: [], client: [] } } as any;
    }
    if (url.includes("/telemetry")) {
      const id = url.split("/")[1];
      const telemetry = getMockTelemetry();
      // Tự động sinh Telemetry mẫu (nếu chưa có) để hiển thị trên bảng chuẩn ThingsBoard
      if (!telemetry[id] || telemetry[id].length === 0) {
        telemetry[id] = [
          { key: "temperature", value: (25 + Math.random() * 5).toFixed(1), lastUpdate: new Date().toISOString() },
          { key: "humidity", value: (50 + Math.random() * 15).toFixed(1), lastUpdate: new Date().toISOString() },
          { key: "battery", value: Math.floor(60 + Math.random() * 40), lastUpdate: new Date().toISOString() }
        ];
        saveMockTelemetry(telemetry);
      }
      return { data: telemetry[id] } as any;
    }
    return { data: {} as any };
  },
};
