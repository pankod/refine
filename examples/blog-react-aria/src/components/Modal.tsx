import React, {
  type ElementType,
  type RefObject,
  type PropsWithChildren,
} from "react";
import type { OverlayTriggerState } from "@react-stately/overlays";
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
} from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { type AriaButtonProps, OverlayProvider } from "react-aria";

// eslint-disable-next-line
function ModalDialog(props: AriaButtonProps<ElementType> | any) {
  const { title, children } = props;
  // eslint-disable-next-line
  const ref: RefObject<any> = React.useRef();
  const { overlayProps, underlayProps } = useOverlay(props, ref);

  usePreventScroll();
  const { modalProps } = useModal();
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...underlayProps}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          className="w-full max-w-xl bg-white p-7 text-black"
        >
          <h3
            {...titleProps}
            className="mt-0 mb-6 border-b border-solid border-slate-200 pb-4 text-xl font-bold"
          >
            {title}
          </h3>
          {children}
        </div>
      </FocusScope>
    </div>
  );
}

type ModalProps = {
  title: string;
  overlayState: OverlayTriggerState;
};
export default function Modal(props: PropsWithChildren<ModalProps>) {
  const {
    title,
    overlayState: { close, isOpen },
    children,
  } = props;
  return (
    <OverlayProvider>
      {isOpen && (
        <OverlayContainer>
          <ModalDialog title={title} isOpen onClose={close} isDismissable>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {children}
            </div>
          </ModalDialog>
        </OverlayContainer>
      )}
    </OverlayProvider>
  );
}
