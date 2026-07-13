"use client";

import { API_URL } from "@/constants";
import dataProviderSimpleRest from "@refinedev/simple-rest";

export const dataProvider = dataProviderSimpleRest(API_URL);
