/**
 * Generic operators (all column types except json, jsonb)
 */
interface GenericOperator<T> {
  _eq?: T;
  _neq?: T;
  _gt?: T;
  _gte?: T;
  _lt?: T;
  _lte?: T;
  _in?: Array<T>;
  _nin?: Array<T>;
  _is_null?: boolean;
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
interface NumberOperator extends GenericOperator<number> {}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
interface StringOperator extends GenericOperator<string> {
  _ilike?: string;
  _like?: string;
  _nilike?: string;
  _nlike?: string;
  _nsimilar?: string;
  _similar?: string;
  _regex?: string;
  _iregex?: string;
  _nregex?: string;
  _niregex?: string;
}

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
interface JsonOperator extends GenericOperator<number | string | object> {
  /* is the column contained in the given json value */
  _contained_in?: object;
  /* does the column contain the given json value at the top level */
  _contains?: object;
  /* does the string exist as a top-level key in the column */
  _has_key?: string;
  /* do any of these strings exist as top-level keys in the column */
  _has_keys_any?: string[];
  /* do all of these strings exist as top-level keys in the column */
  _has_keys_all?: string[];
}

export type Operator = NumberOperator | StringOperator | JsonOperator;

export type MultiConditionFilter = "_and" | "_or";

type HasuraOperator = NumberOperator & StringOperator & JsonOperator;

export type HasuraOperatorKey = keyof HasuraOperator;

export interface BoolExp {
  // @ts-ignore
  _and?: BoolExp[];
  // @ts-ignore
  _or?: BoolExp[];
  // @ts-ignore
  _not?: BoolExp;
  [key: string]: Operator | BoolExp | BoolExp[];
}
