import { useMemo, useState } from "react";
import { useList, useSubscription } from "@refinedev/core";
import styled from "styled-components";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Select } from "react95";
import { VideoClubLayoutSubPage } from "@/components/layout";
import { NIGHTLY_RENTAL_FEE } from "@/utils/app-settings";
import { convertToUSD } from "@/utils/convert-to-usd";
import { getImagesUrl } from "@/utils/get-cdn-url";
import type { Rental } from "@/types";
import { getToday } from "@/utils/get-today";

const today = getToday();

const optionsRange = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const VideoClubReportPage = () => {
  const [range, setRange] = useState<(typeof optionsRange)[number]>(
    optionsRange[1],
  );

  const navigate = useNavigate();

  const {
    result: dataRental,
    query: { isLoading: isLoadingRental },
  } = useList<Rental>({
    resource: "rentals",
    pagination: {
      mode: "off",
    },
    meta: {
      select: "*",
    },
  });

  const rentals = dataRental?.data || [];
  const {
    rentalsDueTodayCount,
    todayRentalCount,
    todayRevenue,
    totalRentalCount,
  } = useMemo(() => {
    const todayRentals = rentals?.filter((rental) =>
      today.isSame(dayjs(rental.start_at), "day"),
    );

    const todayRevenue = todayRentals?.reduce(
      (acc, rental) => acc + rental.period * NIGHTLY_RENTAL_FEE,
      0,
    );

    const todayRentalCount = todayRentals?.length;

    const rentalsDueTodayCount =
      rentals?.filter((rental) =>
        today.isSame(dayjs(rental.expected_return_at), "day"),
      )?.length || 0;

    const totalRentalCount = rentals?.length || 0;

    return {
      todayRevenue,
      todayRentalCount,
      rentalsDueTodayCount,
      totalRentalCount,
    };
  }, [rentals]);

  const { rangeRevenue, chartData } = useMemo(() => {
    const rentalsByRangeFilter = rentals?.filter((rental) => {
      let start = today;
      switch (range.value) {
        case "weekly":
          start = today.subtract(1, "week");
          break;
        case "monthly":
          start = today.subtract(1, "month");
          break;
        case "yearly":
          start = today.subtract(1, "year");
          break;
      }

      return (
        dayjs(rental.start_at).isAfter(start) &&
        dayjs(rental.start_at).isBefore(today)
      );
    });

    const rangeRevenue = rentalsByRangeFilter?.reduce(
      (acc, rental) => acc + rental.period * NIGHTLY_RENTAL_FEE,
      0,
    );

    const rentalsGroupByRange: Record<string, Rental[]> = {};
    rentalsByRangeFilter?.forEach((rental) => {
      let key = "";
      switch (range.value) {
        case "weekly":
          key = dayjs(rental.start_at).format("dddd");
          break;
        case "monthly":
          key = dayjs(rental.start_at).format("DD-MM-YYYY");
          break;
        case "yearly":
          key = dayjs(rental.start_at).format("MM-YYYY");
          break;
      }

      if (!rentalsGroupByRange[key]) {
        rentalsGroupByRange[key] = [];
      }
      rentalsGroupByRange[key].push(rental);
    });
    const chartData = Object.keys(rentalsGroupByRange).map((key) => {
      return {
        name: key,
        value: rentalsGroupByRange[key].reduce(
          (acc, rental) => acc + rental.period * NIGHTLY_RENTAL_FEE,
          0,
        ),
      };
    });

    return {
      rangeRevenue,
      chartData,
    };
  }, [rentals, range.value]);

  const {
    result: dataMembers,

    query: { isLoading: isLoadingMembers, refetch: refetchMemebers },
  } = useList({
    resource: "members",
    pagination: {
      mode: "off",
    },
    meta: {
      select: "*, rentals(*)",
    },
  });

  useSubscription({
    channel: "rentals",
    onLiveEvent: () => {
      refetchMemebers();
    },
  });

  const members = dataMembers?.data || [];
  const totalMembers = members?.length || 0;
  const { activeMembers } = useMemo(() => {
    const activeMembers =
      members?.filter((member) => member?.rentals?.length > 0) || [];
    return {
      activeMembers: activeMembers.length || 0,
    };
  }, [members]);

  const {
    result: dataTitles,
    query: { isLoading: isLoadingTitles },
  } = useList({
    resource: "titles",
    pagination: {
      mode: "off",
    },
    meta: {
      select: "*",
    },
  });
  const titles = dataTitles?.data || [];
  const totalTitles = titles?.length || 0;

  const {
    result: dataTapes,
    query: { isLoading: isLoadingTapes },
  } = useList({
    resource: "tapes",
    pagination: {
      mode: "off",
    },
    meta: {
      select: "*",
    },
  });

  const tapes = dataTapes?.data || [];
  const totalTapes = tapes?.length || 0;

  const isLoading =
    isLoadingRental || isLoadingMembers || isLoadingTitles || isLoadingTapes;

  return (
    <VideoClubLayoutSubPage
      title="Report"
      help="You can see the report of the Refine Video Club."
      isLoading={isLoading}
      onClose={() => navigate("/video-club")}
      containerStyle={{
        maxWidth: "unset",
        backgroundImage: `url(${getImagesUrl("/bg-white-noise.png")})`,
      }}
    >
      <Container>
        <ContainerGraph>
          <ContainerGraphHeader>
            <SelectRange
              menuMaxHeight={160}
              value={range.value}
              options={optionsRange}
              onChange={(option) => {
                setRange(option as typeof range);
              }}
            />
            <StatRangeRow>
              <StatRangeLabel>{range.label} Revenue:</StatRangeLabel>
              <StatRangeValue>{convertToUSD(rangeRevenue)}</StatRangeValue>
            </StatRangeRow>
          </ContainerGraphHeader>

          <ContainerChart>
            <LineChart
              width={600}
              height={352}
              data={chartData}
              margin={{
                top: 32,
                right: 32,
                left: 4,
                bottom: 8,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="black"
                strokeDasharray="0"
                fill="#B5B5B5"
              />
              <XAxis
                dataKey="name"
                type="category"
                tickFormatter={(value) => {
                  if (range.value === "weekly") {
                    return value.slice(0, 3);
                  }
                  if (range.value === "monthly") {
                    return value.slice(0, 5);
                  }

                  return value;
                }}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="linear"
                dataKey="value"
                stroke="#FF00FF"
                strokeWidth={2}
                isAnimationActive={false}
                dot={(props) => {
                  const { cx, cy, value } = props;

                  return (
                    <svg
                      x={cx - 6}
                      y={cy - 6}
                      width={12}
                      height={12}
                      fill="#FF00FF"
                      viewBox="0 0 12 12"
                    >
                      <title>{value}</title>
                      <rect width="12" height="12" fill="#FF00FF" />
                    </svg>
                  );
                }}
                shapeRendering="crispEdges"
              />
            </LineChart>
          </ContainerChart>
        </ContainerGraph>

        <ContainerStat>
          <StatTodaysRevenue>
            <StatLabel>Today's Revenue:</StatLabel>
            <StatValue>{convertToUSD(todayRevenue)}</StatValue>
          </StatTodaysRevenue>

          <StatDark>
            <StatLabel>Rentals Today</StatLabel>
            <StatValue>{todayRentalCount}</StatValue>
          </StatDark>
          <StatLight>
            <StatLabel>Rentals Due Today</StatLabel>
            <StatValue>{rentalsDueTodayCount}</StatValue>
          </StatLight>

          <StatActiveMembers>
            <StatLabel>Active Members</StatLabel>
            <StatValue>{activeMembers}</StatValue>
          </StatActiveMembers>

          <StatDark>
            <StatLabel>Total Members</StatLabel>
            <StatValue>{totalMembers}</StatValue>
          </StatDark>

          <StatLight>
            <StatLabel>Total Rentals</StatLabel>
            <StatValue>{totalRentalCount} </StatValue>
          </StatLight>

          <StatDark>
            <StatLabel>Total Titles</StatLabel>
            <StatValue>{totalTitles} </StatValue>
          </StatDark>

          <StatLight>
            <StatLabel>Total Tapes</StatLabel>
            <StatValue>{totalTapes}</StatValue>
          </StatLight>
        </ContainerStat>
      </Container>
    </VideoClubLayoutSubPage>
  );
};

const Container = styled.div`
  padding: 16px;
  display: flex;
  gap: 40px;
`;

const ContainerGraph = styled.div``;

const ContainerGraphHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;
`;

const SelectRange = styled(Select)`
  width: 140px !important;
`;

const ContainerChart = styled.div`
  background-color: white;
  border: 2px solid black;
  margin-top: 24px;
`;

const StatRangeRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const StatRangeLabel = styled.div``;

const StatRangeValue = styled.div`
  font-weight: bold;
`;

const ContainerStat = styled.div``;

const StatRow = styled.div`
  width: 296px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatDark = styled(StatRow)`
  background-color: #B5B5B5;
`;

const StatLight = styled(StatRow)`
  background-color: #D9D9D9;
`;

const StatTodaysRevenue = styled(StatRow)`
  background-color: #2F711E;
  color: white;
  margin-bottom: 16px;
`;

const StatActiveMembers = styled(StatRow)`
  background-color: #2D6F6F;
  color: white;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const StatLabel = styled.div`
  white-space: nowrap;
`;

const StatValue = styled.div`
  white-space: nowrap;
`;
