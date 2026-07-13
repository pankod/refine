import { Button, Separator, Slider, Window } from "react95";
import styled from "styled-components";
import { type SVGProps, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { getImagesUrl } from "@/utils/get-cdn-url";

type Props = {
  youtubeKey: string;
};

export const MediaPlayer = ({ youtubeKey }: Props) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoState, setVideoState] = useState<"playing" | "paused" | "stop">(
    "stop",
  );

  return (
    <StyledWindow>
      <VideoContainer>
        {videoState === "stop" && (
          <WindowsLogo
            src={getImagesUrl("/windows-logo-merging.gif")}
            alt="Windows Logo"
          />
        )}
        {videoState !== "stop" && (
          <ReactPlayer
            ref={playerRef}
            url={`https://www.youtube.com/watch?v=${youtubeKey}`}
            volume={volume}
            onPause={() => {
              setVideoState("paused");
            }}
            onPlay={() => {
              setVideoState("playing");
            }}
            onEnded={() => {
              setVideoState("stop");
              setVideoProgress(0);
            }}
            onProgress={(value) => {
              setVideoProgress(value.played * 100);
            }}
            width="100%"
            height="100%"
            playing={videoState === "playing"}
          />
        )}
      </VideoContainer>

      <div
        style={{
          padding: "4px 16px",
        }}
      >
        <VideoTimeSlider
          min={0}
          max={100}
          defaultValue={0}
          value={videoProgress}
          isPlaying={videoState === "playing"}
          onChange={(value) => {
            setVideoProgress(value);
            playerRef?.current?.seekTo(value / 100, "fraction");
          }}
        />
      </div>

      <ActionsContainer>
        <ActionButton
          variant={videoState === "playing" ? "default" : "thin"}
          active={videoState === "playing"}
          onClick={() => setVideoState("playing")}
        >
          <PlayIcon />
        </ActionButton>
        <ActionButton
          variant={videoState === "paused" ? "default" : "thin"}
          active={videoState === "paused"}
          disabled={videoState === "stop"}
          onClick={() => setVideoState("paused")}
        >
          <PauseIcon />
        </ActionButton>
        <ActionButton
          variant="thin"
          disabled={videoState === "stop"}
          onClick={() => setVideoState("stop")}
        >
          <StopIcon />
        </ActionButton>

        <ActionSeparator orientation="vertical" size={42} />

        <ActionButton variant="thin" disabled>
          <GoToStartIcon />
        </ActionButton>
        <ActionButton variant="thin" disabled>
          <RewindIcon />
        </ActionButton>
        <ActionButton variant="thin" disabled>
          <FastForwardIcon />
        </ActionButton>
        <ActionButton variant="thin" disabled>
          <GoToEndIcon />
        </ActionButton>

        <ActionSeparator orientation="vertical" size={42} />

        <ActionButton variant="thin" disabled>
          <SettingsIcon />
        </ActionButton>

        <ActionSeparator orientation="vertical" size={42} />

        <VolumeContainer>
          <ActionButton
            variant="thin"
            onClick={() => {
              setVolume(volume === 0 ? 0.5 : 0);
            }}
          >
            <VolumeIcon
              src={
                volume === 0
                  ? getImagesUrl("/volume-off.png")
                  : getImagesUrl("/volume-on.png")
              }
            />
          </ActionButton>

          <VolumeSliderContainer>
            <VolumeSliderBar />
            <VolumeSlider
              min={0}
              max={1}
              defaultValue={0.5}
              value={volume}
              step={0.1}
              onChange={(value) => {
                setVolume(value);
              }}
            />
          </VolumeSliderContainer>
        </VolumeContainer>
      </ActionsContainer>
    </StyledWindow>
  );
};

const StyledWindow = styled(Window)``;

const VideoContainer = styled.div`
  width: 568px;
  height: 370px;
`;

const WindowsLogo = styled.img`
  width: 100%;
  height: 100%;
`;

const VideoTimeSlider = styled(Slider)<{ isPlaying?: boolean }>`
  margin-bottom: 4px;
  & > div {
    height: 16px;
    background-color: ${({ isPlaying }) => (isPlaying ? "#fff" : "unset")};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  justify-content: space-between;
`;

const ActionButton = styled(Button)`
  width: 42px;
  height: 42px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActionSeparator = styled(Separator)`
  margin-left: 6px;
  margin-right: 6px;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 44px;
`;

const VolumeSliderContainer = styled.div`
  position: relative;
`;

const VolumeSlider = styled(Slider)`
  width: 98px;
  margin-bottom: 0;
  outline: none;

  & > input {
    outline: none;
  }

  & > div {
    opacity: 0;
  }

  & > div::before {
    border: 0;
  }

  & > span {
    top: 0;
  }
`;

const VolumeSliderBar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={98}
    height={30}
    viewBox="0 0 98 30"
    fill="none"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
    }}
    {...props}
  >
    <title>{"Volume Slider"}</title>
    <path fill="#fff" d="M96 28V2h2v28H0v-2h96Z" />
    <path
      fill="#707070"
      d="M98 0h-4v2h-8v2h-6v2h-8v2h-6v2h-6v2h-8v2h-6v2h-8v2h-6v2h-8v2h-6v2h-6v2H4v2H2v2h2v-2h8v-2h6v-2h6v-2h8v-2h6v-2h8v-2h6v-2h8v-2h6v-2h6V8h8V6h6V4h8V2h4V0Z"
    />
  </svg>
);

const VolumeIcon = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 4px;
`;

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <title>{"Play"}</title>
    <path
      fill="currentColor"
      d="M4 22H0V0h4v2h4v2h4v2h4v2h4v2h2v2h-2v2h-4v2h-4v2H8v2H4v2Z"
    />
  </svg>
);

const PauseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={18}
    fill="none"
    {...props}
  >
    <title>{"Pause"}</title>
    <path fill="currentColor" d="M6 0H0v18h6V0ZM16 0h-6v18h6V0Z" />
  </svg>
);

const StopIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={18}
    fill="none"
    {...props}
  >
    <title>{"Stop"}</title>
    <path fill="currentColor" d="M0 0h16v18H0z" />
  </svg>
);

const GoToStartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={14}
    fill="none"
    {...props}
  >
    <title>{"Go To Start"}</title>
    <path
      fill="#707070"
      d="M22 14V0h-2v2h-2v2h-2v2h-2v2h2v2h2v2h2v2h2ZM12 14V0h-2v2H8v2H6v2H4v2h2v2h2v2h2v2h2ZM2 14V0H0v14h2Z"
    />
  </svg>
);

const RewindIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={14}
    fill="none"
    {...props}
  >
    <title>{"Rewind"}</title>
    <path
      fill="#707070"
      d="M18 14V0h-2v2h-2v2h-2v2h-2v2h2v2h2v2h2v2h2ZM8 14V0H6v2H4v2H2v2H0v2h2v2h2v2h2v2h2Z"
    />
  </svg>
);

const FastForwardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={14}
    fill="none"
    {...props}
  >
    <title>{"Fast Forward"}</title>
    <path
      fill="#707070"
      d="M0 14V0h2v2h2v2h2v2h2v2H6v2H4v2H2v2H0ZM10 14V0h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2Z"
    />
  </svg>
);

const GoToEndIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={14}
    fill="none"
    {...props}
  >
    <title>{"Go To End"}</title>
    <path
      fill="#707070"
      d="M0 14V0h2v2h2v2h2v2h2v2H6v2H4v2H2v2H0ZM10 14V0h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2ZM20 14V0h2v14h-2Z"
    />
  </svg>
);

const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={22}
    fill="none"
    {...props}
  >
    <title>{"Settings"}</title>
    <path
      fill="#707070"
      d="M6 2v2H4v2H2V4H0V2h2V0h2v2h2ZM16 2V0h-2v2H8v2h6v2h2V4h2V2h-2ZM6 10v2H4v2H2v-2H0v-2h2V8h2v2h2ZM16 10V8h-2v2H8v2h6v2h2v-2h2v-2h-2ZM6 20v-2H4v-2H2v2H0v2h2v2h2v-2h2ZM16 16v2h2v2h-2v2h-2v-2H8v-2h6v-2h2Z"
    />
  </svg>
);
