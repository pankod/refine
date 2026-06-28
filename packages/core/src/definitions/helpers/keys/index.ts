import type { BaseKey } from "../../../contexts/data/types";

type ParametrizedDataActions = "list" | "infinite";
type IdRequiredDataActions = "one";
type IdsRequiredDataActions = "many";
type DataMutationActions =
  | "custom"
  | "customMutation"
  | "create"
  | "createMany"
  | "update"
  | "updateMany"
  | "delete"
  | "deleteMany";

type AuthActionType =
  | "login"
  | "logout"
  | "identity"
  | "register"
  | "forgotPassword"
  | "check"
  | "onError"
  | "permissions"
  | "updatePassword"
  | "updateIdentity";

type AuditActionType = "list" | "log" | "rename";

type IdType = BaseKey;
type IdsType = IdType[];

type ParamsType = any;

type KeySegment = string | IdType | IdsType | ParamsType;

export function arrayFindIndex<T>(array: T[], slice: T[]): number {
  return array.findIndex(
    (item, index) =>
      index <= array.length - slice.length &&
      slice.every(
        (sliceItem, sliceIndex) => array[index + sliceIndex] === sliceItem,
      ),
  );
}

export function arrayReplace<T>(
  array: T[],
  partToBeReplaced: T[],
  newPart: T[],
): T[] {
  const newArray: T[] = [...array];
  const startIndex = arrayFindIndex(array, partToBeReplaced);

  if (startIndex !== -1) {
    newArray.splice(startIndex, partToBeReplaced.length, ...newPart);
  }

  return newArray;
}

export function stripUndefined(segments: KeySegment[]) {
  return segments.filter((segment) => segment !== undefined);
}

class BaseKeyBuilder {
  segments: KeySegment[] = [];

  constructor(segments: KeySegment[] = []) {
    this.segments = segments;
  }

  key() {
    return this.segments;
  }

  get() {
    return this.segments;
  }
}

class ParamsKeyBuilder extends BaseKeyBuilder {
  params(paramsValue?: ParamsType) {
    return new BaseKeyBuilder([...this.segments, paramsValue]);
  }
}

class DataIdRequiringKeyBuilder extends BaseKeyBuilder {
  id(idValue?: IdType) {
    return new ParamsKeyBuilder([
      ...this.segments,
      idValue ? String(idValue) : undefined,
    ]);
  }
}

class DataIdsRequiringKeyBuilder extends BaseKeyBuilder {
  ids(...idsValue: IdsType) {
    return new ParamsKeyBuilder([
      ...this.segments,
      ...(idsValue.length ? [idsValue.map((el) => String(el))] : []),
    ]);
  }
}

class DataResourceKeyBuilder extends BaseKeyBuilder {
  action(actionType: ParametrizedDataActions): ParamsKeyBuilder;
  action(actionType: IdRequiredDataActions): DataIdRequiringKeyBuilder;
  action(actionType: IdsRequiredDataActions): DataIdsRequiringKeyBuilder;
  action(
    actionType:
      | ParametrizedDataActions
      | IdRequiredDataActions
      | IdsRequiredDataActions,
  ): ParamsKeyBuilder | DataIdRequiringKeyBuilder | DataIdsRequiringKeyBuilder {
    if (actionType === "one") {
      return new DataIdRequiringKeyBuilder([...this.segments, actionType]);
    }
    if (actionType === "many") {
      return new DataIdsRequiringKeyBuilder([...this.segments, actionType]);
    }
    if (["list", "infinite"].includes(actionType)) {
      return new ParamsKeyBuilder([...this.segments, actionType]);
    }
    throw new Error("Invalid action type");
  }
}

class DataKeyBuilder extends BaseKeyBuilder {
  resource(resourceName?: string) {
    return new DataResourceKeyBuilder([...this.segments, resourceName]);
  }

  mutation(mutationName: DataMutationActions) {
    return new ParamsKeyBuilder([
      ...(mutationName === "custom" ? this.segments : [this.segments[0]]),
      mutationName,
    ]);
  }
}

class AuthKeyBuilder extends BaseKeyBuilder {
  action(actionType: AuthActionType) {
    return new ParamsKeyBuilder([...this.segments, actionType]);
  }
}

class AccessResourceKeyBuilder extends BaseKeyBuilder {
  action(resourceName: string) {
    return new ParamsKeyBuilder([...this.segments, resourceName]);
  }
}

class AccessKeyBuilder extends BaseKeyBuilder {
  resource(resourceName?: string) {
    return new AccessResourceKeyBuilder([...this.segments, resourceName]);
  }
}

class AuditActionKeyBuilder extends BaseKeyBuilder {
  action(actionType: Extract<AuditActionType, "list">) {
    return new ParamsKeyBuilder([...this.segments, actionType]);
  }
}

class AuditKeyBuilder extends BaseKeyBuilder {
  resource(resourceName?: string) {
    return new AuditActionKeyBuilder([...this.segments, resourceName]);
  }

  action(actionType: Extract<AuditActionType, "rename" | "log">) {
    return new ParamsKeyBuilder([...this.segments, actionType]);
  }
}

export class KeyBuilder extends BaseKeyBuilder {
  data(name?: string) {
    return new DataKeyBuilder(["data", name || "default"]);
  }

  auth() {
    return new AuthKeyBuilder(["auth"]);
  }

  access() {
    return new AccessKeyBuilder(["access"]);
  }

  audit() {
    return new AuditKeyBuilder(["audit"]);
  }
}

export const keys = () => new KeyBuilder([]);
