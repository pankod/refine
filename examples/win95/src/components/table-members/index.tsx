import { getDefaultFilter, useSubscription, useTable } from "@refinedev/core";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableContainer,
  TableHeadCell,
  TableRow,
  TableDataCell,
  TableHead,
  TableFilterContainer,
  TableFilterInputContainer,
  TableFilterInputLabel,
  TableFilterInputText,
} from "@/components/table";
import type { ExtendedMember } from "@/types";
import { hasActiveRental } from "@/utils/has-active-rental";
import { Pagination } from "@/components/pagination";
import { DangerIcon } from "@/components/icons";
import { VideoClubLayoutSubPage } from "@/components/layout";

type Props = {
  selectedMember: ExtendedMember | null;
  setSelectedMember: (member: ExtendedMember) => void;
};

export const TableMembers = ({ selectedMember, setSelectedMember }: Props) => {
  const navigate = useNavigate();

  const {
    tableQuery: membersQueryResult,
    pageCount,
    currentPage: current,
    setCurrentPage: setCurrent,
    filters,
    setFilters,
  } = useTable<ExtendedMember>({
    resource: "members",

    meta: {
      select: "*, rentals(*)",
    },
  });
  const members = membersQueryResult?.data?.data || [];

  useSubscription({
    channel: "rentals",
    onLiveEvent: () => {
      membersQueryResult?.refetch();
    },
  });

  return (
    <VideoClubLayoutSubPage
      title="Select Member"
      help="You can browse all the members in the Refine Video Club."
      onClose={() => navigate("/video-club")}
      isLoading={membersQueryResult?.isLoading}
    >
      <Container>
        <TableContainer>
          <TableFilterContainer>
            <TableFilterInputContainer>
              <TableFilterInputLabel>First Name:</TableFilterInputLabel>
              <TableFilterInputText
                defaultValue={getDefaultFilter(
                  "first_name",
                  filters,
                  "contains",
                )}
                onChange={(e) => {
                  setCurrent(1);
                  setFilters([
                    {
                      field: "first_name",
                      value: e.target.value,
                      operator: "contains",
                    },
                  ]);
                }}
              />
            </TableFilterInputContainer>
            <TableFilterInputContainer>
              <TableFilterInputLabel>Last Name:</TableFilterInputLabel>
              <TableFilterInputText
                defaultValue={getDefaultFilter(
                  "last_name",
                  filters,
                  "contains",
                )}
                onChange={(e) => {
                  setCurrent(1);
                  setFilters([
                    {
                      field: "last_name",
                      value: e.target.value,
                      operator: "contains",
                    },
                  ]);
                }}
              />
            </TableFilterInputContainer>
            <TableFilterInputContainer>
              <TableFilterInputLabel>Member ID:</TableFilterInputLabel>
              <TableFilterInputText
                defaultValue={getDefaultFilter("id", filters, "eq")}
                onChange={(e) => {
                  const value = e.target?.value?.trim();
                  setCurrent(1);
                  setFilters([
                    {
                      field: "id",
                      value: value ? Number(value) : null,
                      operator: "eq",
                    },
                  ]);
                }}
              />
            </TableFilterInputContainer>
            <TableFilterInputContainer>
              <TableFilterInputLabel>Phone Number:</TableFilterInputLabel>
              <TableFilterInputText
                defaultValue={getDefaultFilter("phone", filters, "contains")}
                onChange={(e) => {
                  setCurrent(1);
                  setFilters([
                    {
                      field: "phone",
                      value: e.target.value,
                      operator: "contains",
                    },
                  ]);
                }}
              />
            </TableFilterInputContainer>
          </TableFilterContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell $width={24} $px={5}>
                  {""}
                </TableHeadCell>
                <TableHeadCell $width={64}>ID</TableHeadCell>
                <TableHeadCell $width={190}>Firt Name</TableHeadCell>
                <TableHeadCell $width={190}>Last Name</TableHeadCell>
                <TableHeadCell $width={140}>Phone</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ height: "340px" }}>
              {members.map((member) => {
                return (
                  <TableRow
                    key={member.id}
                    $selected={selectedMember?.id === member.id}
                    onClick={() => setSelectedMember(member)}
                  >
                    <TableDataCell $px={5} $width={24}>
                      {hasActiveRental({
                        member,
                      }) ? (
                        <DangerIcon message="Member has unreturned tape(s)" />
                      ) : null}
                    </TableDataCell>
                    <TableDataCell $width={64}>{member.id}</TableDataCell>
                    <TableDataCell $width={190}>
                      {member.first_name}
                    </TableDataCell>
                    <TableDataCell $width={190}>
                      {member.last_name}
                    </TableDataCell>
                    <TableDataCell $width={140}>{member.phone}</TableDataCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Pagination
            pageCount={pageCount}
            current={current}
            setCurrent={setCurrent}
          />
        </TableContainer>
      </Container>
    </VideoClubLayoutSubPage>
  );
};

const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 24px;
`;
