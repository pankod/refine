import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import type { IDeleteModalProps } from "../../interfaces";

export const DeleteModal: React.FC<IDeleteModalProps> = ({
  isOpen,
  onOpenChange,
  onDelete,
  warningMessage,
}) => {
  return (
    <Modal isOpen={isOpen} backdrop="opaque" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Product deletion
            </ModalHeader>
            <ModalBody>
              <p>{warningMessage}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  onClose();
                  onDelete();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
