import React from "react";
import { useModal } from "@refinedev/core";

export const DummyList: React.FC = () => {
  const { visible, show, close } = useModal();

  return (
    <>
      <button onClick={show}>Show Modal</button>
      {visible && (
        <div>
          <p>Dummy Modal Content</p>
          <button onClick={close}>Close Modal</button>
        </div>
      )}
    </>
  );
};
