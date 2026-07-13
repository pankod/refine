import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  type HttpError,
  useCreate,
  useCreateMany,
  useNavigation,
} from "@refinedev/core";
import dayjs from "dayjs";
import {
  Anchor,
  NumberInput,
  Button,
  TextInput,
  Separator,
  GroupBox,
} from "react95";
import styled from "styled-components";
import { VideoClubLayoutSubPage } from "@/components/layout";
import { MediaPlayerModal } from "@/components/media-player";
import { ImagePixelated } from "@/components/image-pixelated";
import {
  type TitleByTmdbIdResponse,
  getTitleByTmdbId,
} from "@/utils/get-title-by-tmdb-id";
import { parseTmdbIdFromUrl } from "@/utils/parse-tmdb-id-from-url";
import { getImagesUrl } from "@/utils/get-cdn-url";
import type { Tape, VideoTitle } from "@/types";

export const VideoClubPageCreateTitle = () => {
  const navigate = useNavigate();
  const { show } = useNavigation();

  const [trailer, setTrailer] = useState(false);

  const { mutateAsync: createTitle } = useCreate<
    VideoTitle,
    HttpError,
    Omit<VideoTitle, "id" | "created_at">
  >({ resource: "titles", meta: { select: "*" }, successNotification: false });
  const { mutateAsync: createTapes } = useCreateMany<
    Tape,
    HttpError,
    Omit<Tape, "id" | "created_at">
  >({
    resource: "tapes",
    meta: { select: "*" },
  });

  const [numberOfCopies, setNumberOfCopies] = React.useState<number>(1);
  const [titleQuery, setTitleQuery] = React.useState<{
    data: TitleByTmdbIdResponse["data"] | null;
    existing: boolean;
    loading: boolean;
    queried: boolean;
  }>({
    data: null,
    existing: false,
    loading: false,
    queried: false,
  });

  const checkMovieFromTMDB = async (value: string) => {
    const id = parseTmdbIdFromUrl(value);

    if (!id) {
      setTitleQuery({
        data: null,
        existing: false,
        loading: false,
        queried: true,
      });
      return;
    }

    setTitleQuery({
      data: null,
      existing: false,
      loading: true,
      queried: false,
    });

    getTitleByTmdbId(id)
      .then((response) => {
        setTitleQuery({
          data: response?.data ?? null,
          existing: response?.existing ?? false,
          loading: false,
          queried: true,
        });
      })
      .catch(() => {
        setTitleQuery({
          data: null,
          existing: false,
          loading: false,
          queried: true,
        });
      });
  };

  const addTitle = async () => {
    if (!titleQuery?.data) return;

    createTitle({
      values: titleQuery.data,
    }).then((response) => {
      if (!response?.data) return;

      const title_id = response.data.id;

      const tapes = Array.from({ length: numberOfCopies }, (_, index) => ({
        title_id,
        available: true,
      }));

      createTapes({
        values: tapes,
        successNotification: {
          message: "Title added successfully!",
          type: "success",
          description: `"${response?.data.title}" with ${numberOfCopies} copies.`,
        },
      }).then(() => {
        show("titles", title_id, "push");
      });
    });
  };

  return (
    <>
      <VideoClubLayoutSubPage
        isLoading={titleQuery.loading}
        title="Add Title"
        help={"You can add a new title to the video club from TMDB database."}
        onClose={() => navigate("/video-club")}
        containerStyle={{ minWidth: "800px", maxWidth: "800px" }}
      >
        <Container>
          <InfoDetails>
            <InfoBubble src={getImagesUrl("/info-bubble.png")} />
            <InfoContent>
              <InfoLine>
                <span>{"Our inventory is provided by "}</span>
                <InfoAnchor
                  href="https://www.themoviedb.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  {"The Movie DB "}
                  <ExternalAnchorIcon
                    src={getImagesUrl("/external-icon.png")}
                  />
                </InfoAnchor>
              </InfoLine>
              <InfoLine>
                Please find the title from their catalog and paste the URL to
                the input below.
              </InfoLine>
            </InfoContent>
          </InfoDetails>
          <InputContainer
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData(event.currentTarget);
              const value = formData.get("movie-url") as string;
              if (!value.trim()) return;

              checkMovieFromTMDB(value);
            }}
          >
            <InputLabel>TMDB URL:</InputLabel>
            <TMDBInput
              name="movie-url"
              id="movie-url"
              placeholder="e.g. https://www.themoviedb.org/movie/105"
            />
            <GoButton type="submit">GO</GoButton>
          </InputContainer>
          <TitleDetails disabled={!titleQuery?.data} label="Title Details">
            <Poster
              src={`https://image.tmdb.org/t/p/w200${titleQuery?.data?.poster_path}`}
            />
            <DetailsContainer>
              <DetailItem>
                <DetailItemLabel>Title:</DetailItemLabel>
                <DetailItemValue
                  style={{ fontWeight: "bold", color: "#000080" }}
                >
                  {titleQuery?.data?.title}
                </DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>ID:</DetailItemLabel>
                <DetailItemValue>{titleQuery?.data?.id}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Category:</DetailItemLabel>
                <DetailItemValue>
                  {titleQuery?.data?.genres.join(", ")}
                </DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Year:</DetailItemLabel>
                <DetailItemValue>{titleQuery?.data?.year}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Duration:</DetailItemLabel>
                <DetailItemValue>
                  {dayjs
                    .duration(
                      titleQuery?.data?.duration_minutes ?? 0,
                      "minutes",
                    )
                    .format("H[h] m[m]")}
                </DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Director:</DetailItemLabel>
                <DetailItemValue>{titleQuery?.data?.director}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Cast:</DetailItemLabel>
                <DetailItemValue>
                  {titleQuery?.data?.cast.join(", ")}
                </DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Overview:</DetailItemLabel>
                <DetailItemValue>{titleQuery?.data?.overview}</DetailItemValue>
              </DetailItem>
            </DetailsContainer>
          </TitleDetails>
          <CopiesContainer>
            <DetailItemTrailerButton
              disabled={!titleQuery?.data?.trailer_key}
              onClick={() => {
                setTrailer(true);
              }}
            >
              <DetailItemTrailerIcon
                src={getImagesUrl("/watch-trailer.png")}
                alt="watch trailer"
              />
              Watch Trailer
            </DetailItemTrailerButton>

            <CopiesInputContainer>
              <CopiesLabel>Number of Copies:</CopiesLabel>
              <CopiesInput
                disabled={titleQuery?.existing}
                value={numberOfCopies}
                onChange={(value) => setNumberOfCopies(value)}
              />
            </CopiesInputContainer>
          </CopiesContainer>
          <Separator />
          <BottomContainer>
            <ExistingContainer $visible={titleQuery.existing}>
              <ExistingCheckmark
                src={getImagesUrl("/add-titlegreen-check.png")}
              />
              <span>This title is already in our inventory.</span>
            </ExistingContainer>
            <ButtonsContainer>
              {titleQuery?.existing ? (
                <ViewDetailsButton
                  onClick={() =>
                    navigate(`/video-club/titles/${titleQuery?.data?.id}`)
                  }
                >
                  View Details
                </ViewDetailsButton>
              ) : (
                <AddButton
                  disabled={!titleQuery?.data || titleQuery?.existing}
                  onClick={addTitle}
                >
                  Add Title
                </AddButton>
              )}
              <CancelButton onClick={() => navigate("/video-club/titles")}>
                Cancel
              </CancelButton>
            </ButtonsContainer>
          </BottomContainer>
        </Container>
      </VideoClubLayoutSubPage>
      {trailer && titleQuery?.data?.trailer_key && (
        <MediaPlayerModal
          youtubeKey={titleQuery?.data?.trailer_key}
          onClose={() => setTrailer(false)}
          title={titleQuery?.data?.title}
        />
      )}
    </>
  );
};

const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoDetails = styled(GroupBox)`
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfoBubble = styled.img`
  width: 64px;
  height: 64px;
`;

const InfoLine = styled.div`
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoAnchor = styled(Anchor)`
    font-weight: bold;
    text-decoration: none;
    color: #0000FF;
`;

const ExternalAnchorIcon = styled.img`
  width: 22px;
  height: 22px;
  display: inline-block;
  margin-bottom: -4px;
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const InputLabel = styled.div`
  font-weight: bold;
  width: 88px;
  flex-shrink: 0;
`;

const TMDBInput = styled(TextInput)`
    flex: 1;
`;

const GoButton = styled(Button)`
    width: 72px;
    font-weight: bold;
`;

const TitleDetails = styled(GroupBox)`
  padding-top: 24px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  display: flex;
  gap: 32px;
`;

const Poster = styled(ImagePixelated)`
  flex-shrink: 0;
  width: 200px;
  height: 300px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.material};

  &::before {
    content: "";
    background-color: ${({ theme }) => theme.material};
    background-image: url(${getImagesUrl("/movie-poster-placeholder.png")});
    background-size: 200px 300px;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 305px;
  min-height: 305px;
`;

const DetailItem = styled.div`
  display: flex;
  padding: 8px 0;
  justify-content: flex-start;
`;

const DetailItemLabel = styled.div`
  flex-shrink: 0;
  width: 88px;
  font-weight: bold;
  color: #707070;
`;

const DetailItemValue = styled.div`
  flex: 1;
`;

const CopiesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CopiesInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CopiesLabel = styled.div``;

const CopiesInput = styled(NumberInput)`
  width: 80px;
  max-width: 80px;
  min-width: unset;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ExistingCheckmark = styled.img`
  width: 24px;
  height: 24px;
`;

const ExistingContainer = styled.div<{ $visible: boolean }>`
  flex-shrink: 0;
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: bold;
  color: #2F721E;
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;

const ButtonsContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  gap: 12px;
`;

const ViewDetailsButton = styled(Button)`
  font-weight: bold;
  min-width: 158px;
`;

const AddButton = styled(Button)`
  min-width: 158px;
  font-weight: bold;
`;

const CancelButton = styled(Button)`
  width: 110px;
`;

const DetailItemTrailerButton = styled(Button)`
  width: 192px;
`;

const DetailItemTrailerIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
