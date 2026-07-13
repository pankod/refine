import { useState } from "react";
import { useNavigate } from "react-router";
import { useShow, useSubscription } from "@refinedev/core";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableDataCell as DefaultTableDataCell,
  TableHead,
  TableHeadCell as DefaultTableHeadCell,
  TableRow,
  Button,
  GroupBox,
} from "react95";
import styled from "styled-components";
import { VideoClubLayoutSubPage } from "@/components/layout";
import { ImagePixelated } from "@/components/image-pixelated";
import { MediaPlayerModal } from "@/components/media-player";
import { getTMDBImgLink } from "@/utils/get-tmdb-img-link";
import { getImagesUrl } from "@/utils/get-cdn-url";
import { NIGHTLY_RENTAL_FEE } from "@/utils/app-settings";
import type { ExtendedVideoTitle, Member, Rental } from "@/types";

export const VideoClubPageShowTitle = () => {
  const [trailer, setTrailer] = useState(false);
  const navigate = useNavigate();

  const {
    query: { data, isLoading, refetch },
  } = useShow<
    Omit<ExtendedVideoTitle, "rentals"> & {
      rentals: (Rental & { member: Member })[];
    }
  >({
    resource: "titles",
    meta: {
      select: "*, tapes(*), rentals(*, member:members(*))",
    },
  });

  useSubscription({
    channel: "tapes",
    onLiveEvent: () => {
      refetch();
    },
  });

  useSubscription({
    channel: "rentals",
    onLiveEvent: () => {
      refetch();
    },
  });

  useSubscription({
    channel: "members",
    onLiveEvent: () => {
      refetch();
    },
  });

  return (
    <>
      <VideoClubLayoutSubPage
        isLoading={isLoading}
        title={data?.data?.title ?? ""}
        help={
          "You can see the details of the selected title with rental history."
        }
        onClose={() => navigate("/video-club/titles")}
        containerStyle={{
          width: "100%",
        }}
      >
        <Container>
          <TitleDetails label="Title Details">
            <Poster
              src={getTMDBImgLink({
                path: data?.data?.poster_path || "",
              })}
            />
            <DetailsContainer>
              <DetailItem>
                <DetailItemLabel>Title:</DetailItemLabel>
                <DetailItemValue
                  style={{ fontWeight: "bold", color: "#000080" }}
                >
                  <a
                    href={`https://themoviedb.org/movie/${data?.data?.tmdb_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data?.data?.title}
                  </a>
                </DetailItemValue>
                <DetailItemTrailerButton
                  disabled={!data?.data?.trailer_key}
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
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>ID:</DetailItemLabel>
                <DetailItemValue>{data?.data?.id}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Category:</DetailItemLabel>
                <DetailItemValue>
                  {data?.data?.genres.join(", ")}
                </DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Year:</DetailItemLabel>
                <DetailItemValue>{data?.data?.year}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Duration:</DetailItemLabel>
                <DetailItemValue>
                  {dayjs
                    .duration(data?.data?.duration_minutes ?? 0, "minutes")
                    .format("H[h] m[m]")}
                </DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Director:</DetailItemLabel>
                <DetailItemValue>{data?.data?.director}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Cast:</DetailItemLabel>
                <DetailItemValue>{data?.data?.cast.join(", ")}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Overview:</DetailItemLabel>
                <DetailItemValue>{data?.data?.overview}</DetailItemValue>
              </DetailItem>
            </DetailsContainer>
          </TitleDetails>
          <HistoryContainer label="History">
            <CreatedAtSpan>{`Movie added on: ${dayjs(
              data?.data?.created_at,
            ).format("DD.MM.YYYY")}`}</CreatedAtSpan>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell $width={24} $px={5}>
                    {""}
                  </TableHeadCell>
                  <TableHeadCell $width={64}>Tape ID</TableHeadCell>
                  <TableHeadCell $width={240}>Member</TableHeadCell>
                  <TableHeadCell $width={100}>Rent Date</TableHeadCell>
                  <TableHeadCell $width={100}>Return Date</TableHeadCell>
                  <TableHeadCell $width={64} $align="right">
                    Earning
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ height: "128px" }}>
                {!isLoading &&
                  data?.data?.rentals.map((rental) => {
                    return (
                      <TableRow key={rental.id}>
                        <TableDataCell $px={5} $width={24}>
                          {""}
                        </TableDataCell>
                        <TableDataCell $width={64}>
                          {rental.tape_id}
                        </TableDataCell>
                        <TableDataCell $width={240}>
                          {rental.member.first_name} {rental.member.last_name}
                        </TableDataCell>
                        <TableDataCell $width={100}>
                          {dayjs(rental.start_at).format("DD.MM.YYYY")}
                        </TableDataCell>
                        <TableDataCell $width={100}>
                          {dayjs(rental.returned_at).format("DD.MM.YYYY")}
                        </TableDataCell>
                        <TableDataCell $width={64} $align="right">
                          {"$"}
                          {(rental.period * NIGHTLY_RENTAL_FEE).toFixed(2)}
                        </TableDataCell>
                      </TableRow>
                    );
                  })}
                {Array.from({
                  length: Math.max(0, 5 - (data?.data?.rentals.length ?? 0)),
                }).map((_, index) => (
                  <TableRow key={`placeholder-${index}`}>{}</TableRow>
                ))}
              </TableBody>
            </Table>
            <StatsContainer>
              <StatSpan>
                {"Tapes: "}
                {data?.data?.tapes?.length}
              </StatSpan>
              <StatSpan>
                {"Total earnings so far: "}
                <Strong>
                  {"$"}
                  {data?.data?.rentals
                    ?.reduce(
                      (acc, rental) => acc + rental.period * NIGHTLY_RENTAL_FEE,
                      0,
                    )
                    .toFixed(2)}
                </Strong>
              </StatSpan>
            </StatsContainer>
          </HistoryContainer>
          <CancelButton onClick={() => navigate("/video-club/titles")}>
            Cancel
          </CancelButton>
        </Container>
      </VideoClubLayoutSubPage>
      {trailer && data?.data?.trailer_key && (
        <MediaPlayerModal
          youtubeKey={data?.data?.trailer_key}
          onClose={() => setTrailer(false)}
          title={data?.data?.title || ""}
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

const DetailItemTrailerButton = styled(Button)`
  margin-right: 16px;
`;

const DetailItemTrailerIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const HistoryContainer = styled(GroupBox)`
  padding-top: 24px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CancelButton = styled(Button)`
  width: 110px;
  margin-left: auto;
`;

const CreatedAtSpan = styled.span`
  margin-left: 32px;
`;

const TableDataCell = styled(DefaultTableDataCell)<{
  $width?: number;
  $px?: number;
  $align?: "right" | "left";
}>`
  text-align: ${({ $align }) => $align ?? "left"};
  max-width: ${({ $width }) => `${$width}px`};
  min-width: ${({ $width }) => `${$width}px`};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ $px }) =>
    typeof $px !== "undefined" &&
    `padding-left: ${$px}px; padding-right: ${$px}px;`}
  `;

const TableHeadCell = styled(DefaultTableHeadCell)<{
  $width?: number;
  $px?: number;
  $align?: "right" | "left";
}>`
  text-align: ${({ $align }) => $align ?? "left"};
  max-width: ${({ $width }) => `${$width}px`};
  min-width: ${({ $width }) => `${$width}px`};
  width: ${({ $width }) => `${$width}px`};
  ${({ $px }) =>
    typeof $px !== "undefined" &&
    `padding-left: ${$px}px; padding-right: ${$px}px;`}
  `;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  padding: 0 32px;
`;

const StatSpan = styled.span``;

const Strong = styled.strong`
  font-weight: bold;
`;
