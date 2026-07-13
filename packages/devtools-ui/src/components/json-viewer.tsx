import clsx from "clsx";
import React from "react";
import { JsonView, darkStyles } from "react-json-view-lite";
import { MaximizeIcon } from "./icons/maximize";
import { Modal } from "./modal";

export const JsonViewer = ({ data, label }: { data: any; label: string }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <div className={clsx("re-relative")}>
      <JsonView
        data={data}
        shouldExpandNode={(l) => l < 2}
        style={{
          ...darkStyles,
          container: clsx(
            "re-bg-[#303450]",
            "re-font-mono re-text-xs",
            "[&>*:first-child]:!re-px-[12px]",
            "re-py-1",
            "re-overflow-auto",
            "re-max-h-[160px]",
            "re-rounded-lg",
          ),
          basicChildStyle: clsx(
            "re-py-[3px]",
            "re-pr-[5px]",
            "re-pl-[20px]",
            "re-leading-5",
          ),
          collapsedContent: clsx(
            "re-text-amber-500",
            "after:re-content-['...']",
            "after:re-pr-[5px]",
          ),
          label: clsx("re-mr-[8px]", "re-text-neutral-200"),
          stringValue: clsx("re-text-amber-500"),
          numberValue: clsx("re-text-amber-500"),
          undefinedValue: clsx("re-text-neutral-500"),
          nullValue: clsx("re-text-neutral-500"),
          expandIcon: clsx(
            "after:re-transition-transform",
            "after:re-duration-200",
            "after:re-ease-in-out",
            "after:re-content-['⏵']",
            "after:re-mr-[8px]",
            "after:re-inline-block",
          ),
          collapseIcon: clsx(
            "after:re-transition-transform",
            "after:re-duration-200",
            "after:re-ease-in-out",
            "after:re-content-['⏵']",
            "after:re-mr-[8px]",
            "after:re-inline-block",
            "after:re-rotate-90",
          ),
        }}
      />
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          setModalVisible(true);
        }}
        className={clsx(
          "re-group",
          "re-absolute",
          "re-right-2",
          "re-top-2",
          "re-bg-gray-900",
          "re-bg-opacity-50",
          "hover:re-bg-opacity-75",
          "re-p-1",
          "re-rounded",
          "re-border-0",
          "re-outline-none",
          "re-appearance-none",
          "re-transition-colors",
          "re-duration-200",
          "re-ease-in-out",
        )}
      >
        <MaximizeIcon
          className={clsx(
            "re-w-4",
            "re-h-4",
            "group-hover:re-scale-110",
            "re-transition-transform",
            "re-duration-200",
            "re-ease-in-out",
            "re-text-gray-400",
          )}
        />
      </button>
      <Modal
        overlay
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        className={clsx("re-min-w-[520px]", "re-w-3/4", "re-max-w-[90%]")}
        header={
          <span className={clsx("re-capitalize", "re-font-semibold")}>
            {label}
          </span>
        }
      >
        <div className={clsx("re-p-2")}>
          <JsonView
            data={data}
            shouldExpandNode={(l) => l < 2}
            style={{
              ...darkStyles,
              container: clsx(
                "re-bg-[#303450]",
                "re-font-mono re-text-xs",
                "[&>*:first-child]:!re-px-[12px]",
                "re-py-1",
                "re-overflow-auto",
                "re-max-h-[calc(100vh-96px-65px-16px-2px)]",
                "re-min-h-[calc(100vh-96px-65px-16px-2px)]",
                "re-rounded-lg",
              ),
              basicChildStyle: clsx(
                "re-py-[3px]",
                "re-pr-[5px]",
                "re-pl-[20px]",
                "re-leading-5",
              ),
              collapsedContent: clsx(
                "re-text-amber-500",
                "after:re-content-['...']",
                "after:re-pr-[5px]",
              ),
              label: clsx("re-mr-[8px]", "re-text-neutral-200"),
              stringValue: clsx("re-text-amber-500"),
              numberValue: clsx("re-text-amber-500"),
              undefinedValue: clsx("re-text-neutral-500"),
              nullValue: clsx("re-text-neutral-500"),
              expandIcon: clsx(
                "after:re-transition-transform",
                "after:re-duration-200",
                "after:re-ease-in-out",
                "after:re-content-['⏵']",
                "after:re-mr-[8px]",
                "after:re-inline-block",
              ),
              collapseIcon: clsx(
                "after:re-transition-transform",
                "after:re-duration-200",
                "after:re-ease-in-out",
                "after:re-content-['⏵']",
                "after:re-mr-[8px]",
                "after:re-inline-block",
                "after:re-rotate-90",
              ),
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
