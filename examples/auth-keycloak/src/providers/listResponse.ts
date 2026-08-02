export const toList = <T = any>(payload: unknown): T[] => {
  if (Array.isArray(payload)) return payload as T[];

  if (payload && typeof payload === "object") {
    const wrapped = payload as { data?: unknown; items?: unknown };
    if (Array.isArray(wrapped.data)) return wrapped.data as T[];
    if (Array.isArray(wrapped.items)) return wrapped.items as T[];
  }

  return [];
};

export const getListTotal = (payload: unknown, fallback: number): number => {
  if (payload && typeof payload === "object" && "total" in payload) {
    const total = Number((payload as { total?: unknown }).total);
    if (Number.isFinite(total)) return total;
  }
  return fallback;
};
