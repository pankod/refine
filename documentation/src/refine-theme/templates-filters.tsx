import clsx from "clsx";
import React, {
  type PropsWithChildren,
  type FC,
  type SVGProps,
  type ReactNode,
} from "react";
import type { TemplateEdition } from "../types/integrations";

export type Filters = {
  edition: TemplateEdition;
  uiFramework: string[];
  backend: string[];
};

type Props = {
  svgId?: string;
  className?: string;
  showEdition?: boolean;
  selected: Filters;
  data: {
    editions: {
      label: string;
      icon: null;
    }[];
    uiFrameworks: {
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
    backends: {
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
  };
  onEditionChange: (edition: string) => void;
  onBackendChange: (backend: Filters["backend"][number]) => void;
  onUIFrameworkChange: (framework: Filters["uiFramework"][number]) => void;
};

export const TemplatesFilters: FC<Props> = ({
  svgId,
  className,
  showEdition = true,
  data,
  selected,
  onEditionChange,
  onBackendChange,
  onUIFrameworkChange,
}) => {
  return (
    <div className={clsx("flex", "flex-col", "not-prose", className)}>
      {showEdition && (
        <List label="Edition">
          {data.editions.map((item) => {
            const isSelected = selected.edition === item.label;

            return (
              <ListItem
                key={item.label}
                label={item.label}
                isSelected={isSelected}
                onClick={() => onEditionChange(item.label)}
              />
            );
          })}
        </List>
      )}
      <List label="UI Frameworks" className={clsx("mt-5")}>
        {data.uiFrameworks.map((item) => {
          const isSelected = selected.uiFramework.includes(item.label);
          const Icon = item.icon;

          return (
            <ListItem
              key={item.label}
              icon={<Icon id={svgId} className="!text-white" />}
              label={item.label}
              isSelected={isSelected}
              onClick={() => onUIFrameworkChange(item.label)}
            />
          );
        })}
      </List>
      <List label="Backends" className={clsx("mt-5")}>
        {data.backends.map((item) => {
          const isSelected = selected.backend.includes(item.label);
          const Icon = item.icon;

          return (
            <ListItem
              key={item.label}
              icon={<Icon id={svgId} className="!text-white" />}
              label={item.label}
              isSelected={isSelected}
              onClick={() => onBackendChange(item.label)}
            />
          );
        })}
      </List>
    </div>
  );
};

const List = (
  props: PropsWithChildren<{
    label: string;
    className?: string;
  }>,
) => {
  return (
    <>
      <h4 className={clsx("pl-3", "text-sm", "text-zinc-400", props.className)}>
        {props.label}
      </h4>
      <div className={clsx("flex", "flex-col", "items-start", "gap-2", "mt-4")}>
        {props.children}
      </div>
    </>
  );
};

const ListItem = (props: {
  icon?: ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        "appearance-none",
        "w-full",
        "flex",
        "items-center",
        "h-8",
        "pr-4",
        props.icon && "pl-1.5",
        !props.icon && "pl-2.5",
        "gap-1.5",
        "rounded-full",
        "font-medium",
        "cursor-pointer",
        "border border-zinc-700 ",
        props.isSelected && "bg-zinc-700 ",
        "transition-colors duration-200 ease-in-out",
      )}
    >
      {props.icon}
      <span className={clsx("text-xs", "text-white")}>{props.label}</span>
    </button>
  );
};
