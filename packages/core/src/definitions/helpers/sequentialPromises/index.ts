type EachResolve<TResolve, Response> = (
  result: TResolve,
  index: number,
) => Response;
type EachReject<TReject, Response> = (
  error: TReject,
  index: number,
) => Response;

export const sequentialPromises = async <
  TResolve = unknown,
  TReject = unknown,
  TResolveResponse = unknown,
  TRejectResponse = unknown,
>(
  promises: (() => Promise<TResolve>)[],
  onEachResolve: EachResolve<TResolve, TResolveResponse>,
  onEachReject: EachReject<TReject, TRejectResponse>,
): Promise<(TResolveResponse | TRejectResponse)[]> => {
  const results = [];
  // @ts-expect-error Remove this when we enable `downLevelIterations`
  for (const [index, promise] of promises.entries()) {
    try {
      const result = await promise();

      results.push(onEachResolve(result, index));
    } catch (error) {
      results.push(onEachReject(error as TReject, index));
    }
  }
  return results;
};
