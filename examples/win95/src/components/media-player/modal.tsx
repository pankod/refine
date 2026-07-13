import { Window, WindowHeader, WindowContent, Button } from "react95";
import styled from "styled-components";
import Modal from "react-modal";
import { MediaPlayer } from "@/components/media-player";
import { IconClose } from "@/components/icons";

type Props = {
  youtubeKey: string;
  title?: string;
  onClose?: () => void;
};

export const MediaPlayerModal = ({ onClose, title, youtubeKey }: Props) => {
  return (
    <Modal
      isOpen={true}
      style={{
        overlay: {
          zIndex: 99,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          zIndex: 100,
          padding: 0,
          border: "none",
        },
      }}
    >
      <StyledWindow title={title}>
        <StyledWindowHeader>
          <span>{title}</span>
          <Button onClick={onClose}>
            <IconClose />
          </Button>
        </StyledWindowHeader>
        <StyledWindowContent>
          <MediaPlayer youtubeKey={youtubeKey} />
        </StyledWindowContent>
      </StyledWindow>
    </Modal>
  );
};

const StyledWindow = styled(Window)`
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
`;

const StyledWindowContent = styled(WindowContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 0;

  & > div {
    border: none;
    box-shadow: none;
  }
`;
