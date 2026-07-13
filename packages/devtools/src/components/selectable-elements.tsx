import React from "react";
import debounce from "lodash/debounce";
import { createPortal } from "react-dom";
import { ApplyStyles } from "./apply-styles";
import { SelectorIcon } from "./icons/selector-button";

const MIN_SIZE = 22;

const getPosition = (element: HTMLElement, document: Document) => {
  const { top, left, width, height } = element.getBoundingClientRect();
  const { scrollLeft, scrollTop } = document.documentElement;
  const positionLeft = left + scrollLeft - Math.max(0, MIN_SIZE - width) / 2;
  const positionTop = top + scrollTop - Math.max(0, MIN_SIZE - height) / 2;

  return {
    left: positionLeft,
    top: positionTop,
    width: Math.max(MIN_SIZE, width),
    height: Math.max(MIN_SIZE, height),
  };
};

const SelectableElement = ({
  element,
  name,
  onSelect,
}: {
  element: HTMLElement;
  name: string;
  onSelect: (name: string) => void;
}) => {
  const [position] = React.useState(() => getPosition(element, document));

  const elementRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    // use scroll event listener
    const onScroll = debounce(
      () => {
        const nextPos = getPosition(element, document);
        (["left", "top", "width", "height"] as const).forEach((prop) => {
          elementRef.current?.style.setProperty(prop, `${nextPos[prop]}px`);
        });
        elementRef.current?.style.setProperty("opacity", "1");
      },
      200,
      {
        leading: false,
        trailing: true,
      },
    );

    const opacityOnScroll = debounce(
      () => {
        elementRef.current?.style.setProperty("opacity", "0");
      },
      200,
      {
        leading: true,
        trailing: false,
      },
    );

    document.addEventListener("scroll", onScroll);
    document.addEventListener("scroll", opacityOnScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", opacityOnScroll);
    };
  }, [element]);

  const placement = React.useMemo(() => {
    const tooltipBaseSize = { width: 22, height: 22 };
    const nameWidth = name.length * 7.5;
    const tooltipSize = {
      width: tooltipBaseSize.width + nameWidth,
      height: tooltipBaseSize.height,
    };
    const gap = 4;

    // outside top start
    if (
      position.top - tooltipSize.height > 0 &&
      position.left + tooltipSize.width < window.innerWidth &&
      position.width > tooltipSize.width
    ) {
      return { left: gap / 2, top: tooltipSize.height * -1 - gap };
    }
    // inside top start
    if (
      position.height >= tooltipSize.height * 1.5 &&
      position.width >= tooltipSize.width * 1.5
    ) {
      return { left: 0 + gap, top: 0 + gap };
    }
    // outside left start
    if (position.left - tooltipSize.width > 0) {
      return { right: position.width + gap, top: 0 - 1 };
    }
    // outside right start
    if (
      position.left + position.width + tooltipSize.width <
      window.innerWidth
    ) {
      return { left: position.width + gap, top: 0 - 1 };
    }
    // outside bottom start
    if (
      position.top + position.height + tooltipSize.height <
      document.documentElement.scrollHeight
    ) {
      return { left: 0 - 1, top: position.height + gap };
    }

    return { left: 0, top: 0 };
  }, [position, name.length]);

  return (
    <button
      type="button"
      className="selector-xray-box"
      onClick={(event) => {
        event?.preventDefault();
        event?.stopPropagation();
        onSelect(name);
      }}
      ref={elementRef}
      style={{
        position: "absolute",
        ...position,
      }}
    >
      <div
        style={{
          position: "absolute",
          ...placement,
        }}
        className="selector-xray-info"
      >
        <span className="selector-xray-info-icon">
          <SelectorIcon
            width={12}
            height={12}
            style={{ pointerEvents: "none" }}
          />
        </span>
        <span className="selector-xray-info-title">{` ${name}`}</span>
      </div>
    </button>
  );
};

export const SelectableElements = ({
  elements,
  onSelect,
}: {
  elements: Array<{ element: HTMLElement; name: string }>;
  onSelect: (name: string) => void;
}) => {
  const [selectorBoxRoot, setSelectorBoxRoot] =
    React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!selectorBoxRoot) {
      const element = document.createElement("div");
      element.id = "selector-box-root";

      document.body.appendChild(element);

      setSelectorBoxRoot(element);

      return () => {
        document.body.removeChild(element);
        setSelectorBoxRoot(null);
      };
    }

    return () => 0;
  }, []);

  if (!selectorBoxRoot) return null;

  return (
    <>
      {createPortal(
        elements.map((element, idx) => (
          <SelectableElement
            key={`selector-element-${idx}-${element.name}`}
            {...element}
            onSelect={onSelect}
          />
        )),
        selectorBoxRoot,
      )}
      <ApplyStyles>
        {
          /* css */ `
          .selector-xray-box {
            display: flex;
            margin: 0;
            padding: 0;
            appearance: none;
            z-index: 9999;
            border: 2px dashed #47EBEB;
            border-radius: 6px;
            background: rgba(71, 235, 235, 0.01);
            transition: opacity 0.2s ease-in-out;
            cursor: crosshair;
          }
        
          .selector-xray-info {
            display: flex;
            justify-content: center;
            align-items: center;
      
            z-index: 10;
      
            padding: 3px 0;
            min-width: 22px;
            height: 22px;
      
            color: #14141F;
            background: #47EBEB;
      
            font-size: 12px;
            line-height: 16px;
            font-family: monospace;
            border-radius: 11px;
          }
      
          .selector-xray-info-icon {
            display: flex;
            min-width: 22px;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
          }
      
          .selector-xray-info-title {
            display: block;
            max-width: 0;
            overflow: hidden;
            transition-property: max-width, padding-right;
            transition-duration: 0.2s;
            transition-timing-function: ease-in-out;
            transition-delay: 0.1s;
          }
      
          .selector-xray-box:hover .selector-xray-info-title {
            max-width: 200px;
            padding-right: 8px;
          }
          .selector-xray-box:hover .selector-xray-info-title {
            z-index: 90;
          }
        `
        }
      </ApplyStyles>
    </>
  );
};
