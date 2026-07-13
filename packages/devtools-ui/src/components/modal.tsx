import React from "react";
import clsx from "clsx";
import { CloseIcon } from "./icons/close";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  overlay?: boolean;
};

export const Modal = ({
  visible,
  onClose,
  className,
  children,
  header,
  footer,
  overlay,
}: ModalProps) => {
  const [delayedVisible, setDelayedVisible] = React.useState(visible);

  React.useEffect(() => {
    setTimeout(() => {
      setDelayedVisible(visible);
    }, 200);
  }, [visible]);

  const onCloseInternal = React.useCallback(() => {
    setDelayedVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  return (
    <div
      className={clsx(
        "re-z-10",
        "re-fixed",
        "re-left-0",
        "re-top-0",
        "re-w-full",
        "re-h-full",
        !visible && "re-hidden",
        visible && "re-block",
        !visible && "re-pointer-events-none",
        visible && "re-pointer-events-auto",
      )}
      onClick={(event) => {
        event.stopPropagation();
        onCloseInternal();
      }}
    >
      {overlay && (
        <div
          className={clsx(
            "re-absolute",
            "re-w-full",
            "re-h-full",
            "re-backdrop-blur-sm",
            "re-bg-gray-900",
            "re-bg-opacity-50",
            "re-transition-all",
            "re-ease-in-out",
            "re-duration-200",
            "re-origin-center",
            !delayedVisible && "re-pointer-events-none",
            delayedVisible && "re-pointer-events-auto",
          )}
          style={{
            transform: `${
              delayedVisible ? "scale(1)" : "scale(0)"
            } translate3d(0,0,0)`,
          }}
        />
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "re-absolute",
          "re-left-0",
          "re-top-12",
          "re-max-h-[calc(100%-48px-48px)]",
          "re-h-auto",
          "re-w-[520px]",
          "re-overflow-auto",
          "re-border",
          "re-rounded-2xl",
          "re-border-gray-700",
          "re-bg-gray-800",
          "re-transition-transform",
          "re-duration-200",
          "re-ease-in-out",
          "re-shadow-2xl",
          delayedVisible && "re-scale-100",
          !delayedVisible && "re-scale-0",
          "re-translate-x-[calc(50vw-50%)]",
          "re-origin-center",
          "re-flex",
          "re-flex-col",
          className,
        )}
      >
        <button
          type="button"
          className={clsx(
            "re-absolute",
            "re-right-5",
            "re-top-5",
            "re-w-6",
            "re-h-6",
          )}
          onClick={onCloseInternal}
        >
          <CloseIcon className="re-text-gray-500 re-w-5 re-h-5" />
        </button>
        {header && (
          <div
            className={clsx(
              "re-border-b",
              "re-border-b-gray-700",
              "re-py-5",
              "re-pl-5",
              "re-pr-10",
            )}
          >
            {header}
          </div>
        )}
        <div className={clsx("re-flex-1", "re-overflow-auto")}>
          <div className={clsx("re-flex", "re-flex-col")}>{children}</div>
        </div>
        {footer && (
          <div
            className={clsx("re-border-t", "re-border-t-gray-700", "re-p-5")}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
