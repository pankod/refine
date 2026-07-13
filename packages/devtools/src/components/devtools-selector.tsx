import React from "react";
import { useSelector } from "src/utilities/use-selector";
import { ApplyStyles } from "./apply-styles";
import { SelectableElements } from "./selectable-elements";

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  onHighlight: (name: string) => void;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
};

export const DevtoolsSelector = ({
  active,
  setActive,
  onHighlight,
  icon,
  style,
}: Props) => {
  const { selectableElements } = useSelector(active);

  const onSelect = (name: string) => {
    onHighlight(name);
    setActive(false);
  };

  return (
    <div style={style}>
      <div
        role="button"
        title="Element Selector"
        className="refine-devtools-selector-button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          (document?.activeElement as HTMLElement)?.blur();
          setActive((active) => !active);
        }}
      >
        {icon}
      </div>
      {active && (
        <SelectableElements elements={selectableElements} onSelect={onSelect} />
      )}
      <ApplyStyles>
        {
          /* css */ `
        .refine-devtools-selector-button {
          padding: 0;
          margin: 0;
          height: 100%;
          width: 100%;
          transform: rotate(0deg);
          transition: transform 0.2s ease-in-out;
          line-height: 1;
        }

        .refine-devtools-selector-button:hover {
          transform: rotate(180deg);
        }
    `
        }
      </ApplyStyles>
    </div>
  );
};
