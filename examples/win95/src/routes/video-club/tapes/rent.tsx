import { useList, useMany, useOne, useSubscription } from "@refinedev/core";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, GroupBox, Select, Separator, TextInput } from "react95";
import { useForm } from "@refinedev/react-hook-form";
import { Controller, type FieldValues } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import { VideoClubPageTapeSelectTitle } from "@/routes/video-club/tapes/select-title";
import { VideoClubLayoutSubPage } from "@/components/layout";
import { ImagePixelated } from "@/components/image-pixelated";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/table";
import { DangerIcon, IconChevronLeft } from "@/components/icons";
import { ArrowGreenPixelatedIcon } from "@/components/icons/arrow-green-pixelated";
import { NIGHTLY_RENTAL_FEE } from "@/utils/app-settings";
import { convertToUSD } from "@/utils/convert-to-usd";
import type {
  CreateRental,
  ExtendedMember,
  ExtendedVideoTitle,
  Tape,
  VideoTitle,
} from "@/types";
import { getToday } from "@/utils/get-today";

export const VideoClubPageTapeRent = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();

  const [selectedTitle, setSelectedTitle] = useState<ExtendedVideoTitle | null>(
    null,
  );
  const [screen, setScreen] = useState<"titles" | "rent">("titles");

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
      select: "*, rentals(*)",
    },
  });
  const member = dataMember || null;

  useSubscription({
    channel: "rentals",
    onLiveEvent: () => {
      refetch();
    },
  });

  if (screen === "titles") {
    return (
      <VideoClubPageTapeSelectTitle
        selectedTitle={selectedTitle}
        onTitleSelect={(title) => setSelectedTitle(title)}
        onBackClick={() => navigate("/video-club/tapes/rent")}
        onNextClick={() => setScreen("rent")}
      />
    );
  }

  if (!member && !isLoading) {
    return <Navigate to="/video-club" />;
  }

  return (
    <VideoClubLayoutSubPage
      title="Rent Tape"
      help="Please confirm the rental."
      onClose={() => navigate("/video-club")}
      isLoading={isLoading}
    >
      <Container>
        <MemberDetails member={member} />

        <TitleDetails title={selectedTitle} member={member}>
          <RentTapeForm member={member} title={selectedTitle} />
        </TitleDetails>
      </Container>

      <Separator />

      <ActionContainer>
        <ActionButton type="button" onClick={() => setScreen("titles")}>
          <IconChevronLeft />
          <span>Back</span>
        </ActionButton>
        <ActionButton
          type="submit"
          form="rent-tape-form"
          disabled={!selectedTitle}
        >
          <ArrowGreenPixelatedIcon />
          <span>Confirm</span>
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

const MemberDetails = ({ member }: { member: ExtendedMember | null }) => {
  return (
    <StyledGroupBox label="Member">
      <ImageMember src={member?.photo_url} />
      <ContainerInfo>
        <Grid>
          <Row>
            <Label>Name:</Label>
            <Value>
              {member?.first_name} {member?.last_name}
            </Value>
          </Row>
          <Row>
            <Label>Phone:</Label>
            <Value>{member?.phone}</Value>
          </Row>
        </Grid>
        <TableCurrentRentals member={member} />
      </ContainerInfo>
    </StyledGroupBox>
  );
};

const TableCurrentRentals = ({ member }: { member: ExtendedMember | null }) => {
  const currentRentals = member?.rentals.filter(
    (rental) => !rental.returned_at,
  );

  const { result: data } = useMany<VideoTitle>({
    resource: "titles",
    ids: currentRentals?.map((rental) => rental.title_id) || [],
    queryOptions: {
      enabled: !!currentRentals,
    },
    meta: {
      select: "*",
    },
  });
  const titles = data?.data || [];

  return (
    <>
      <Label
        style={{
          marginTop: "32px",
          marginBottom: "8px",
        }}
      >
        Current Rentals:
      </Label>
      {!currentRentals?.length ? (
        <TextInput
          style={{
            width: "654px",
          }}
          value="No current rentals"
          disabled
        />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell $width={24} $px={5}>
                {""}
              </TableHeadCell>
              <TableHeadCell $width={92}>ID</TableHeadCell>
              <TableHeadCell $width={80}>Tape ID</TableHeadCell>
              <TableHeadCell $width={248}>Movie Title</TableHeadCell>
              <TableHeadCell $width={128}>Return Date</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ maxHeight: "170px" }}>
            {member?.rentals.map((rental) => {
              if (rental.returned_at) return null;
              const isOverdue = dayjs().isAfter(
                dayjs(rental.expected_return_at),
              );

              return (
                <TableRow key={rental.id}>
                  <TableDataCell $px={5} $width={24}>
                    {isOverdue ? <DangerIcon message="Overdue!" /> : null}
                  </TableDataCell>
                  <TableDataCell $width={92}>{rental.id}</TableDataCell>
                  <TableDataCell $width={80}>{rental.tape_id}</TableDataCell>
                  <TableDataCell $width={248}>
                    {
                      titles.find((title) => title.id === rental.title_id)
                        ?.title
                    }
                  </TableDataCell>
                  <TableDataCell $width={128}>
                    {rental.expected_return_at}
                  </TableDataCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

const TitleDetails = ({
  title,
  children,
}: {
  member: ExtendedMember | null;
  title: ExtendedVideoTitle | null;
  children?: React.ReactNode;
}) => {
  return (
    <StyledGroupBox label="Title">
      <ImageTitle
        src={`https://image.tmdb.org/t/p/w185/${title?.poster_path}`}
      />
      <ContainerInfo>
        <Grid>
          <Row>
            <Label>Title:</Label>
            <Value>{title?.title}</Value>
          </Row>
          <Row>
            <Label>Year:</Label>
            <Value>{title?.year}</Value>
          </Row>
          <Row>
            <Label>Category:</Label>
            <Value>{title?.genres.join(", ")}</Value>
          </Row>
          <Row>
            <Label>Movie ID:</Label>
            <Value>{title?.id}</Value>
          </Row>
        </Grid>
        <Separator
          style={{
            marginTop: "24px",
            marginBottom: "24px",
          }}
        />
        {children}
      </ContainerInfo>
    </StyledGroupBox>
  );
};

const RentTapeForm = ({
  member,
  title,
}: {
  member: ExtendedMember | null;
  title: ExtendedVideoTitle | null;
}) => {
  const {
    result: dataTapes,
    query: { isSuccess: tapesIsSuccess },
  } = useList<Tape>({
    resource: "tapes",
    filters: [
      {
        field: "title_id",
        operator: "eq",
        value: title?.id,
      },
      {
        field: "available",
        operator: "eq",
        value: true,
      },
    ],
    meta: {
      select: "*",
    },
  });
  const tapes = dataTapes?.data || [];
  const tapeOptions = tapes.map((tape) => ({
    value: tape.id,
    label: tape.id.toString(),
  }));
  const periodOptions = Array.from({ length: 7 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Nights`,
  }));

  const {
    control,
    watch,
    refineCore: { onFinish },
    formState,
    setValue,
    handleSubmit,
  } = useForm<CreateRental>({
    defaultValues: {
      member_id: member?.id,
      title_id: title?.id,
      tape_id: tapeOptions?.[0]?.value,
      period: periodOptions?.[0]?.value,
    },
    refineCoreProps: {
      resource: "rentals",
      action: "create",
    },
  });

  useEffect(() => {
    if (tapesIsSuccess) {
      setValue("tape_id", tapeOptions?.[0]?.value);
    }
  }, [tapesIsSuccess]);

  const period = watch<"period">("period");
  const returnDate = getToday().add(period, "day").format("DD.MM.YYYY");
  const price = NIGHTLY_RENTAL_FEE * period;

  const onFinishHandler = (data: FieldValues) => {
    onFinish({
      ...data,
      start_at: getToday().format(),
      expected_return_at: getToday().add(data.period, "day").format(),
    });
  };

  return (
    <StyledRentTapeForm
      id="rent-tape-form"
      onSubmit={handleSubmit(onFinishHandler)}
    >
      <Grid>
        <FormRow>
          <FormLabel>Tape ID:</FormLabel>
          <FormValue>
            <Controller
              control={control}
              name="tape_id"
              rules={{ required: "Tape ID is required" }}
              render={({ field }) => (
                <Select
                  width={"100%"}
                  options={tapeOptions}
                  menuMaxHeight={200}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                />
              )}
            />
          </FormValue>
        </FormRow>
        <FormRow>
          <Label>Nightly Fee:</Label>
          <Value>{convertToUSD(price)}</Value>
        </FormRow>
        <FormRow>
          <FormLabel>Period</FormLabel>
          <FormValue>
            <Controller
              control={control}
              name="period"
              render={({ field }) => {
                return (
                  <Select
                    width={"100%"}
                    options={periodOptions}
                    menuMaxHeight={200}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                  />
                );
              }}
            />
          </FormValue>
        </FormRow>
        <FormRow>
          <Label>Return Date:</Label>
          <Value>{returnDate}</Value>
        </FormRow>
      </Grid>
    </StyledRentTapeForm>
  );
};

const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledRentTapeForm = styled.form``;

const StyledGroupBox = styled(GroupBox)`
  display: flex;
  padding: 24px 8px;
  gap: 32px;
`;

const ImageMember = styled(ImagePixelated)`
  width: 200px;
  height: 200px;
  aspect-ratio: 200 / 200;
  object-fit: cover;
`;

const ImageTitle = styled(ImagePixelated)`
  width: 200px;
  height: 300px;
  aspect-ratio: 200 / 300;
  object-fit: cover;
`;

const ContainerInfo = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Label = styled.div`
  min-width: 80px;
  white-space: nowrap;
  font-weight: bold;
`;

const Value = styled.div``;

const FormRow = styled(Row)`
  align-items: center;
`;

const FormLabel = styled(Label)``;

const FormValue = styled(Value)`
  width: 104px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
`;

const ActionButton = styled(Button)`
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
