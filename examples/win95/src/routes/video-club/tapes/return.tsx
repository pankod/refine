import { useState } from "react";
import {
  useNavigation,
  useOne,
  useSubscription,
  useUpdateMany,
} from "@refinedev/core";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import {
  Button,
  Checkbox,
  Frame,
  GroupBox,
  NumberInput,
  Separator,
} from "react95";
import dayjs from "dayjs";
import { VideoClubLayoutSubPage } from "@/components/layout";
import {
  Table,
  TableBody,
  TableContainer,
  TableHeadCell,
  TableRow,
  TableDataCell,
  TableHead,
} from "@/components/table";
import { IconChevronLeft, ArrowGreenPixelatedIcon } from "@/components/icons";
import { ImagePixelated } from "@/components/image-pixelated";
import { NIGHTLY_RENTAL_FEE } from "@/utils/app-settings";
import { convertToUSD } from "@/utils/convert-to-usd";
import type { ExtendedMember, ExtendedRental } from "@/types";

export const VideoClubPageTapeReturn = () => {
  const [selectedRentals, setSelectedRentals] = useState<ExtendedRental[]>([]);

  const { list } = useNavigation();
  const navigate = useNavigate();
  const { memberId } = useParams();

  const {
    result: dataMember,
    query: { isLoading, refetch },
  } = useOne<ExtendedMember>({
    resource: "members",
    id: memberId,
    queryOptions: {
      enabled: !!memberId,
    },
    meta: {
      select: "*, rentals(*, titles(*))",
    },
  });
  const member = dataMember || null;
  const notReturnedRentals =
    member?.rentals.filter((rental) => !rental.returned_at) || [];

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

  const { mutate: checkout } = useUpdateMany<ExtendedRental>({
    resource: "rentals",
    mutationOptions: {
      onSuccess: () => {
        navigate("/video-club");
      },
    },
  });

  const handleOnRentalSelect = (rental: ExtendedRental) => {
    if (selectedRentals.includes(rental)) {
      setSelectedRentals((prev) => prev.filter((r) => r.id !== rental.id));
    } else {
      setSelectedRentals((prev) => [...prev, rental]);
    }
  };

  const selectAllRentals = () => {
    setSelectedRentals(notReturnedRentals);
  };

  const unselectAllRentals = () => {
    setSelectedRentals([]);
  };

  const handleCheckOut = () => {
    checkout({
      ids: selectedRentals.map((r) => r.id),
      values: selectedRentals.map((r) => ({
        returned_at: new Date(),
      })),
    });
  };

  return (
    <VideoClubLayoutSubPage
      title="Return Tape"
      help="Please select tape to return."
      onClose={() => navigate("/video-club")}
      isLoading={isLoading}
    >
      <Container>
        <ContainerMember label="Member">
          <ImageMember src={member?.photo_url} />
          <MemberDetailsContainer>
            <MemberInfo member={member} />
            <RentalsTableTitle>Select Returning Tapes</RentalsTableTitle>
            <RentalsTable
              rentals={notReturnedRentals}
              selectedRentals={selectedRentals}
              onRentalSelect={(rental) => {
                handleOnRentalSelect(rental);
              }}
              onSelectAll={selectAllRentals}
              onUnSelectAll={unselectAllRentals}
            />
          </MemberDetailsContainer>
        </ContainerMember>
        <ContainerReceipt label="Recepit">
          <Receipt rentals={notReturnedRentals} />
          <SubTotalSection rentals={selectedRentals} />
        </ContainerReceipt>
      </Container>

      <Separator />

      <ActionContainer>
        <ActionButton type="button" onClick={() => list("rentals-return")}>
          <IconChevronLeft />
          <span>Back</span>
        </ActionButton>
        <ActionButton
          onClick={handleCheckOut}
          disabled={selectedRentals.length === 0}
        >
          <ArrowGreenPixelatedIcon />
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            Check out
          </span>
        </ActionButton>
        <ActionButton
          style={{
            marginLeft: "12px",
          }}
          onClick={() => navigate("/video-club")}
        >
          Cancel
        </ActionButton>
      </ActionContainer>
    </VideoClubLayoutSubPage>
  );
};

const MemberInfo = (props: { member: ExtendedMember | null }) => {
  const { show } = useNavigation();

  return (
    <ContainerMemberInfo>
      <LabelValueRow>
        <LabelValueContainer variant="status">
          <Label>Name:</Label>
          <Value>
            {props.member?.first_name} {props.member?.last_name}
          </Value>
        </LabelValueContainer>
        <LabelValueContainer variant="status">
          <Label>Phone:</Label>
          <Value>{props.member?.phone}</Value>
        </LabelValueContainer>
      </LabelValueRow>
      <ButtonMemberDetails
        disabled={!props.member}
        onClick={() => {
          if (props.member) {
            show("members", props.member.id);
          }
        }}
      >
        Member Details
      </ButtonMemberDetails>
    </ContainerMemberInfo>
  );
};

const RentalsTable = (props: {
  rentals: ExtendedRental[];
  selectedRentals?: ExtendedRental[];
  onRentalSelect: (rental: ExtendedRental) => void;
  onSelectAll?: () => void;
  onUnSelectAll?: () => void;
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell $width={24}>
              <StyledCheckbox
                onClick={(e) => {
                  const isChecked = e.currentTarget.checked;
                  if (isChecked) {
                    props.onSelectAll?.();
                  } else {
                    props.onUnSelectAll?.();
                  }
                }}
              />
            </TableHeadCell>
            <TableHeadCell $width={64}>ID</TableHeadCell>
            <TableHeadCell $width={90}>Tape ID</TableHeadCell>
            <TableHeadCell $width={270}>Movie Title</TableHeadCell>
            <TableHeadCell $width={128}>Return Date</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rentals?.map((rental) => (
            <TableRow key={rental.id}>
              <TableDataCell $width={24}>
                <StyledCheckbox
                  value={rental.id}
                  checked={props.selectedRentals?.includes(rental)}
                  onChange={() => props.onRentalSelect(rental)}
                />
              </TableDataCell>
              <TableDataCell $width={64}>{rental.id}</TableDataCell>
              <TableDataCell $width={90}>{rental.tape_id}</TableDataCell>
              <TableDataCell $width={270}>{rental.titles?.title}</TableDataCell>
              <TableDataCell $width={128}>
                {rental.expected_return_at}
              </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Receipt = (props: { rentals: ExtendedMember["rentals"] }) => {
  return (
    <ReceiptTable>
      <ReceiptTableHead>
        <ReceiptTableRow>
          <ReceiptTableHeadCell $width={400} $align="left" $px={0}>
            Title
          </ReceiptTableHeadCell>
          <ReceiptTableHeadCell $width={64}>Tape ID</ReceiptTableHeadCell>
          <ReceiptTableHeadCell $width={96}>Nightly Fee</ReceiptTableHeadCell>
          <ReceiptTableHeadCell $width={80}>Period</ReceiptTableHeadCell>
          <ReceiptTableHeadCell $width={96} $align="right" $px={0}>
            Total
          </ReceiptTableHeadCell>
        </ReceiptTableRow>
      </ReceiptTableHead>
      <ReceiptTableBody>
        {props.rentals.map((rental) => (
          <ReceiptTableRow key={rental.id}>
            <ReceiptTableDataCell $width={400} $align="left" $px={0}>
              {rental.titles?.title}
            </ReceiptTableDataCell>
            <ReceiptTableDataCell $width={64} $align="center">
              {rental.tape_id}
            </ReceiptTableDataCell>
            <ReceiptTableDataCell $width={96} $align="right">
              {convertToUSD(NIGHTLY_RENTAL_FEE)}
            </ReceiptTableDataCell>
            <ReceiptTableDataCell $width={80}>
              {rental.period} Nights
            </ReceiptTableDataCell>
            <ReceiptTableDataCell $width={96} $align="right" $px={0}>
              {convertToUSD(rental.period * NIGHTLY_RENTAL_FEE)}
            </ReceiptTableDataCell>
          </ReceiptTableRow>
        ))}
      </ReceiptTableBody>
    </ReceiptTable>
  );
};

const SubTotalSection = (props: { rentals: ExtendedRental[] }) => {
  const [discount, setDiscount] = useState(0);

  const total = props.rentals.reduce(
    (acc, rental) => acc + rental.period * NIGHTLY_RENTAL_FEE,
    0,
  );
  const totalWithDiscount = total - discount;

  return (
    <SubTotalContainer>
      <DateText>Date: {dayjs().format("DD.MM.YYYY")} </DateText>
      <div>
        <SubTotalRow>
          <SubTotalLabel>Sub total:</SubTotalLabel>
          <SubTotalValue>{convertToUSD(total)}</SubTotalValue>
        </SubTotalRow>
        <SubTotalRow>
          <SubTotalLabel>Discount:</SubTotalLabel>
          -$
          <SubTotalDiscount
            defaultValue={0}
            min={0}
            max={total}
            onChange={(e) => setDiscount(e)}
          />
        </SubTotalRow>
        <TotalRow>
          <TotalLabel>Total:</TotalLabel>
          <TotalValue>{convertToUSD(totalWithDiscount)}</TotalValue>
        </TotalRow>
      </div>
    </SubTotalContainer>
  );
};

const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const StyledGroupBox = styled(GroupBox)`
  width: 100%;
  display: flex;
  padding: 12px;
  gap: 32px;
`;

const ContainerMember = styled(StyledGroupBox)``;

const ContainerMemberInfo = styled.div`
  display: flex;
`;

const ContainerReceipt = styled(StyledGroupBox)`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const ImageMember = styled(ImagePixelated)`
  min-width: 200px;
  min-height: 200px;
  max-width: 200px;
  max-height: 200px;
  aspect-ratio: 200 / 200;
  object-fit: cover;
`;

const MemberDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RentalsTableTitle = styled.div`
  font-weight: bold;
  margin-top: 32px;
  margin-bottom: 4px;
`;

const LabelValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LabelValueContainer = styled(Frame)`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Label = styled.div`
  white-space: nowrap;
  font-weight: bold;
`;

const Value = styled.div``;

const StyledCheckbox = styled(Checkbox)`
  margin: 0;

  & > div {
    margin-right: 0;
  }
`;

const ReceiptTable = styled.div`
  width: 100%;
`;

const ReceiptTableHead = styled.div`
  border-bottom: 2px solid ${() => "#707070"};
`;

const ReceiptTableHeadCell = styled.div<{
  $width?: number;
  $px?: number;
  $align?: "left" | "right" | "center";
}>`
  text-align: left;
  font-weight: bold;
  max-width: ${({ $width }) => `${$width}px`};
  min-width: ${({ $width }) => `${$width}px`};
  width: ${({ $width }) => `${$width}px`};
  ${({ $align }) => `text-align: ${$align || "left"};`}
  ${({ $px }) => `margin-left: ${$px ?? 16}px; margin-right: ${$px ?? 16}px;`}
`;

const ReceiptTableBody = styled.div`
  width: 100%;
`;

const ReceiptTableRow = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 2px solid ${({ theme }) => "#707070"};
  &:last-child {
    border-bottom: none;
  }
`;

const ReceiptTableDataCell = styled.div<{
  $width?: number;
  $px?: number;
  $align?: "left" | "right" | "center";
}>`
  max-width: ${({ $width }) => `${$width}px`};
  min-width: ${({ $width }) => `${$width}px`};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ $align }) => `text-align: ${$align || "left"};`}
  ${({ $px }) => `margin-left: ${$px ?? 16}px; margin-right: ${$px ?? 16}px;`}
`;

const DateText = styled.div`
  margin-top: auto;
  margin-bottom: 0;
`;

const SubTotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;

const SubTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${() => "#707070"};
  padding: 12px;
`;

const SubTotalLabel = styled.div`
  width: 80px;
`;

const SubTotalValue = styled.div``;

const SubTotalDiscount = styled(NumberInput)`
  width: 100px !important;
  margin-left: 4px;
`;

const TotalRow = styled(SubTotalRow)`
  border-bottom: none;
`;

const TotalLabel = styled(SubTotalLabel)`
  font-weight: bold;
  text-align: right;
  width: 64px;
`;

const TotalValue = styled(SubTotalValue)`
  font-weight: bold;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
`;

const ActionButton = styled(Button)`
  min-width: 110px;
  display: flex;
  padding-left: 12px;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const ButtonMemberDetails = styled(Button)`
  width: 160px;
  margin-left: auto;
`;
