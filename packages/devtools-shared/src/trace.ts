export type TraceType = {
  file?: string;
  line?: number;
  column?: number;
  function?: string;
  isRefine: boolean;
  packageName?: string;
};
