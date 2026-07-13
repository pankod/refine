import type { TPixel } from "./pixel";

export type TCanvas = {
  id: string;
  name?: string;
  width: number;
  height: number;
  created_at: string;
  is_featured?: string;
  pixels?: TPixel[];
};
