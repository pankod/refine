import { DataProvider } from "@refinedev/strapi-v4";
import { axiosInstance } from "@/providers/axios";
import { API_URL } from "@/utils/constants";

export const dataProvider = DataProvider(`${API_URL}/api`, axiosInstance);
