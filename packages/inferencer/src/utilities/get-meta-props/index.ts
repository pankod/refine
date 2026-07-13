import type { InferencerComponentProps } from "../../types";

export type Action = keyof NonNullable<
  InferencerComponentProps["meta"]
>[string];

/**
 * @returns meta props for a given identifier by actions
 * @description Searchs actions in meta[identifier] and returns first founded meta[identifier][action] and disgards the rest
 * if no action is found, returns meta[identifier]["default"]
 *
 * @param identifier
 * @param meta
 * @param actions keys of meta[identifier]. actions order is important. first founded action will be returned from meta[`identifier`]
 */
export const getMetaProps = (
  identifier?: string,
  meta?: InferencerComponentProps["meta"],
  actions?: Action[],
) => {
  if (!(meta && actions && identifier)) return "";
  if (!Object.keys(meta).length) return "";

  const metaByIdentifier = identifier ? meta[identifier] : {};
  const metaByActions: string[] = [];

  // we need to return first founded action in metaByIdentifier and disgard the rest.
  const firstFoundedActionInMeta = actions.find(
    (action) => metaByIdentifier[action],
  );

  // if actions is not found, we need to return metaByIdentifier["default"]
  const metaByAction =
    metaByIdentifier?.[firstFoundedActionInMeta || "default"];

  // if neither actions or default is found, we need to return empty string
  if (!metaByAction) {
    return "";
  }

  const { gqlQuery, gqlMutation, ...metaValueByAction } = metaByAction;

  // add founded action's all meta values besides gqlQuery, gqlMutation.
  Object.keys(metaValueByAction).forEach((key) => {
    metaByActions.push(`${key}: ${JSON.stringify(metaValueByAction[key])}`);
  });

  // manipulate and add gqlQuery
  if (gqlQuery) {
    metaByActions.push(`gqlQuery: gql\`${gqlQuery?.loc?.source?.body}\``);
  }

  // manipulate and add gqlMutation
  if (gqlMutation) {
    metaByActions.push(`gqlMutation: gql\`${gqlMutation?.loc?.source?.body}\``);
  }

  const metaValues = metaByActions.join(",");
  if (metaValues.length) {
    return `meta:{${metaValues}}`;
  }

  return "";
};

export const pickMeta = (
  identifier?: string,
  meta?: InferencerComponentProps["meta"],
  actions?: Action[],
) => {
  if (meta && actions && identifier) {
    const metaValues = identifier ? meta[identifier] : {};

    const actionsToCheck = [...actions, "default"] as Action[];

    const metaValue = actionsToCheck.reduce(
      (acc, action) => {
        return acc ?? metaValues?.[action];
      },
      undefined as Record<string, unknown> | undefined,
    );

    if (metaValue) {
      return metaValue;
    }
  }
  return undefined;
};
