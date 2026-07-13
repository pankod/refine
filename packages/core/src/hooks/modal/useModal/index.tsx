import { useCallback, useState } from "react";

export type useModalReturnType = {
  visible: boolean;
  show: () => void;
  close: () => void;
};

export type useModalProps = {
  /**
   * Initial state of the modal
   */
  defaultVisible?: boolean;
};

export const useModal = ({
  defaultVisible = false,
}: useModalProps = {}): useModalReturnType => {
  const [visible, setVisible] = useState(defaultVisible);

  const show = useCallback(() => setVisible(true), [visible]);
  const close = useCallback(() => setVisible(false), [visible]);

  return {
    visible,
    show,
    close,
  };
};
