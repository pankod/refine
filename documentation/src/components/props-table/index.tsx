import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import {
  type DeclarationType,
  requireDocgen,
} from "../../utils/require-docgen";
import PropTag from "../prop-tag";
import Tooltip from "../tooltip";

type Overrides = `${string}-${
  | "hidden"
  | "deprecated"
  | "required"
  | "name"
  | "description"
  | "default"
  | "type"}`;

type OverridesMap = { [key: Overrides]: string };

type RowItem = DeclarationType["props"][string];

type Props = {
  module: string;
  hideDefaults?: boolean;
} & OverridesMap;

const Name = ({
  prop,
  overrides,
}: {
  prop: RowItem;
  overrides: OverridesMap;
}) => {
  const required = overrides[`${prop.name}-required`] ?? prop.required;
  const deprecated =
    overrides[`${prop.name}-deprecated`] ?? prop.tags?.deprecated;
  const deprecation =
    overrides[`${prop.name}-deprecated`] ?? prop.tags?.deprecated ?? "";

  const variant = useMemo(() => {
    const className = "props-table--name";

    if (deprecated) {
      return `${className} props-table--name__deprecated`;
    }

    return className;
  }, [prop, overrides]);

  const tooltipLabel = useMemo(() => {
    if (deprecation) return <ReactMarkdown>{deprecation}</ReactMarkdown>;

    return null;
  }, [prop, overrides]);

  return (
    <Tooltip label={tooltipLabel}>
      <>
        <span className={variant}>
          {overrides[`${prop.name}-name`] ?? prop.name}
        </span>
        {required && <PropTag asterisk />}
      </>
    </Tooltip>
  );
};

const Type = ({
  prop,
  overrides,
}: {
  prop: RowItem;
  overrides: OverridesMap;
}) => {
  const typeDef = overrides[`${prop.name}-type`] ?? prop.type.name;
  const splitted = typeDef.split(" | ");
  const isUnion = splitted.length > 1;
  const hasLongTypeInUnion = splitted.some((t) => t.length > 20);

  const hasBackticks = /`/.test(typeDef);

  return (
    <>
      {hasBackticks ? (
        <ReactMarkdown>{typeDef}</ReactMarkdown>
      ) : hasLongTypeInUnion && isUnion ? (
        <>
          {splitted.map((t, i) => (
            <code className="max-w-xs h-min" key={i}>
              <ReactMarkdown>{t}</ReactMarkdown>
            </code>
          ))}
        </>
      ) : (
        <code className="max-w-xs h-min">
          <ReactMarkdown>{typeDef}</ReactMarkdown>
        </code>
      )}
    </>
  );
};

const Description = ({
  prop,
  overrides,
}: {
  prop: RowItem;
  overrides: OverridesMap;
}) => {
  return (
    <ReactMarkdown>
      {overrides[`${prop.name}-description`] ??
        prop.tags.description ??
        prop.description}
    </ReactMarkdown>
  );
};

const Default = ({
  prop,
  overrides,
}: {
  prop: RowItem;
  overrides: OverridesMap;
}) => {
  const jsDocDefault = prop.tags?.default;
  const tsDefault =
    prop.defaultValue?.value && prop.defaultValue?.value !== jsDocDefault
      ? prop.defaultValue?.value
      : undefined;
  const customDefault = overrides[`${prop.name}-default`];

  if (jsDocDefault || customDefault) {
    return <ReactMarkdown>{customDefault ?? jsDocDefault}</ReactMarkdown>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {typeof tsDefault !== "undefined" ? (
        <code className="max-w-xs h-min">
          <ReactMarkdown>{tsDefault}</ReactMarkdown>
        </code>
      ) : null}
    </div>
  );
};

const RowName = ({
  prop,
  overrides,
}: {
  prop: RowItem;
  overrides: OverridesMap;
}) => {
  return (
    <td>
      <div className="flex items-center">
        <Name prop={prop} overrides={overrides} />
      </div>
    </td>
  );
};

const RowType = ({
  prop,
  overrides,
}: {
  prop: RowItem;
  overrides: OverridesMap;
}) => {
  return (
    <td className="props-table__type-cell">
      <div className="flex flex-wrap gap-1">
        <Type prop={prop} overrides={overrides} />
      </div>
    </td>
  );
};

const RowDescription = ({
  prop,
  overrides,
}: {
  prop: RowItem;
  overrides: OverridesMap;
}) => {
  return (
    <td className="props-table__description-cell">
      <Description prop={prop} overrides={overrides} />
    </td>
  );
};

const RowDefault = ({
  prop,
  overrides,
}: {
  prop: RowItem;
  overrides: OverridesMap;
}) => {
  return (
    <td className="props-table__default-value-cell">
      <Default prop={prop} overrides={overrides} />
    </td>
  );
};

const PropsTable: React.FC<React.PropsWithChildren<Props>> = ({
  module,
  hideDefaults,
  children,
  ...overrides
}) => {
  const data = requireDocgen(module);

  const hideRowDefault = useMemo(() => {
    if (hideDefaults) return false;

    const keys = Object.keys(overrides);
    const hasDefaultKey = keys.some((key) => key.endsWith("-default"));
    if (hasDefaultKey) {
      return false;
    }

    const hasDefaultValue = Object.values(data?.props ?? {}).some(
      (prop) => prop.defaultValue?.value,
    );

    return !hasDefaultValue;
  }, [overrides]);

  if (!data) {
    return null;
  }

  const props = [...Object.values(data.props)];

  return (
    <div className="table-container">
      <table className="props-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
            {hideRowDefault ? null : <th>Default</th>}
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => {
            if (overrides[`${prop.name}-hidden`]) {
              return null;
            }
            return (
              <tr
                key={prop.name}
                {...(prop.tags?.deprecated
                  ? {
                      "data-is-deprecated": "true",
                    }
                  : {})}
              >
                <RowName prop={prop} overrides={overrides} />
                <RowType prop={prop} overrides={overrides} />
                <RowDescription prop={prop} overrides={overrides} />
                {hideRowDefault ? null : (
                  <RowDefault prop={prop} overrides={overrides} />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {children}
    </div>
  );
};

export default PropsTable;
