import React from "react";
import { DevtoolsSelector } from "./devtools-selector";
import { DevtoolsIcon } from "./icons/devtools-icon";
import { SelectorButtonIcon } from "./icons/selector-button";
import { ApplyStyles } from "./apply-styles";

type Props = {
  onClick?: () => void;
  groupHover?: boolean;
  onSelectorHighlight: (name: string) => void;
  selectorActive: boolean;
  setSelectorActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DevtoolsPin = ({
  onClick,
  onSelectorHighlight,
  selectorActive,
  setSelectorActive,
}: Props) => {
  return (
    <div role="button" className="devtools-selector-pin-box" onClick={onClick}>
      <DevtoolsIcon />
      <DevtoolsSelector
        style={{
          position: "absolute",
          top: 5,
          right: 18,
          width: "16px",
          height: "16px",
        }}
        icon={
          <SelectorButtonIcon
            width={16}
            height={16}
            style={{ pointerEvents: "none" }}
          />
        }
        onHighlight={onSelectorHighlight}
        active={selectorActive}
        setActive={setSelectorActive}
      />
      <ApplyStyles>
        {
          /* css */ `
            .devtools-selector-pin-box {
              z-index: 9999;
              position: relative;
              user-select: none;
              -webkit-user-select: none;
              background: none;
              border: none;
              padding: 0;
              margin: 0;
              appearance: none;
              padding-right: 1px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              color: #6C7793;
              transition: color 0.1s ease-in-out;
            }

            .devtools-selector-pin-box:hover {
              color: #0FBDBD;
            }
          `
        }
      </ApplyStyles>
    </div>
  );
};
