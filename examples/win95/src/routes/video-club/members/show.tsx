import { useNavigation, useOne, useSubscription } from "@refinedev/core";
import { useParams } from "react-router";
import styled from "styled-components";
import dayjs from "dayjs";
import { Button, GroupBox } from "react95";
import { VideoClubLayoutSubPage } from "@/components/layout";
import {
  Table,
  TableBody,
  TableHeadCell,
  TableRow,
  TableDataCell,
  TableHead,
  TableContainer,
} from "@/components/table";
import { ImagePixelated } from "@/components/image-pixelated";
import { NIGHTLY_RENTAL_FEE } from "@/utils/app-settings";
import { convertToUSD } from "@/utils/convert-to-usd";
import type { ExtendedMember } from "@/types";

export const VideoClubMemberPageShow: React.FC = () => {
  const { id } = useParams();
  const { list } = useNavigation();

  const {
    result,
    query: { isLoading, refetch },
  } = useOne<ExtendedMember>({
    resource: "members",
    id,
    meta: {
      select: "*, rentals(*, titles(*))",
    },
  });
  const member = result;

  useSubscription({
    channel: "rentals",
    onLiveEvent: () => {
      refetch();
    },
  });

  useSubscription({
    channel: "titles",
    onLiveEvent: () => {
      refetch();
    },
  });

  return (
    <VideoClubLayoutSubPage
      title={`${member?.first_name || ""} ${member?.last_name || ""}`}
      help="You can see the details of the member in the Refine Video Club."
      onClose={() => list("members")}
      isLoading={isLoading}
    >
      <Container>
        <MemberDetails member={member} />
        <History member={member} />
      </Container>
    </VideoClubLayoutSubPage>
  );
};

const MemberDetails = ({ member }: { member?: ExtendedMember }) => {
  const { edit } = useNavigation();

  return (
    <DetailsGroupBox label="Member Details">
      <Image src={member?.photo_url} alt={member?.first_name} />
      <div>
        <LabelValueContainer>
          <Label>Name:</Label>
          <ValueName>
            {member?.first_name} {member?.last_name}
          </ValueName>
        </LabelValueContainer>
        <LabelValueContainer>
          <Label>ID:</Label>
          <Value>{member?.id}</Value>
        </LabelValueContainer>
        <LabelValueContainer>
          <Label>Phone:</Label>
          <Value>{member?.phone}</Value>
        </LabelValueContainer>
        <LabelValueContainer>
          <Label>Address:</Label>
          <Value>{member?.address}</Value>
        </LabelValueContainer>
      </div>
      <EditButton
        onClick={() => {
          if (!member) return;
          edit("members", member?.id);
        }}
      >
        Edit
      </EditButton>
    </DetailsGroupBox>
  );
};

const History = ({ member }: { member?: ExtendedMember }) => {
  return (
    <HistoryGroupBox label="History">
      <MemberCreatedAtText>
        Member added on:{" "}
        {dayjs(member?.created_at).year(1995).format("DD.MM.YYYY")}
      </MemberCreatedAtText>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell $width={24}>{""}</TableHeadCell>
              <TableHeadCell $width={280}>Title</TableHeadCell>
              <TableHeadCell $width={64}>Tape#</TableHeadCell>
              <TableHeadCell $width={120}>Rent Date</TableHeadCell>
              <TableHeadCell $width={120}>Return Date</TableHeadCell>
              <TableHeadCell $width={96} $textAlign="right">
                Earning
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {member?.rentals.map((rental) => {
              const earning = !rental.returned_at
                ? 0
                : rental.period * NIGHTLY_RENTAL_FEE;

              return (
                <TableRow key={rental.id}>
                  <TableDataCell $width={24}>{""}</TableDataCell>
                  <TableDataCell $width={280}>
                    {rental.titles?.title}
                  </TableDataCell>
                  <TableDataCell $width={64}>{rental.tape_id}</TableDataCell>
                  <TableDataCell $width={120}>
                    {dayjs(rental.created_at).format("DD.MM.YYYY")}
                  </TableDataCell>
                  <TableDataCell $width={120}>
                    {rental.returned_at
                      ? dayjs(rental.returned_at).format("DD.MM.YYYY")
                      : "-"}
                  </TableDataCell>
                  <TableDataCell $width={96} $textAlign="right">
                    {convertToUSD(earning)}
                  </TableDataCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </HistoryGroupBox>
  );
};

const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
`;

const StyledGroupBox = styled(GroupBox)`
  display: flex;
  padding: 24px 12px 12px 12px;
`;

const DetailsGroupBox = styled(StyledGroupBox)`
  gap: 32px;
`;

const HistoryGroupBox = styled(StyledGroupBox)`
  flex-direction: column;
  gap: 16px;
`;

const Image = styled(ImagePixelated)`
  min-width: 200px;
  min-height: 200px;
  max-width: 200px;
  max-height: 200px;
  aspect-ratio: 200 / 200;
  object-fit: cover;
`;

const LabelValueContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const Label = styled.div`
  font-weight: bold;
  width: 86px;
  color: #707070;
`;

const Value = styled.div``;

const ValueName = styled(Value)`
  color: #000080;
  font-weight: bold;
`;

const EditButton = styled(Button)`
  margin-left: auto;
  width: 88px;
`;

const MemberCreatedAtText = styled.p`
  margin-left: 48px;
`;
