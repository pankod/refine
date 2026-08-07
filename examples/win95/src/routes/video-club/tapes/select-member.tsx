import { useState } from "react";
import { getDefaultFilter, useNavigation, useTable } from "@refinedev/core";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Button, Separator } from "react95";
import { Pagination } from "@/components/pagination";
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
import { VideoClubLayoutSubPage } from "@/components/layout";
import {
  IconChevronRight,
  IconChevronLeft,
  DangerIcon,
} from "@/components/icons";
import { hasActiveRental } from "@/utils/has-active-rental";
import { getImagesUrl } from "@/utils/get-cdn-url";
import type { ExtendedMember } from "@/types";

type Props = {
  variant: "rent" | "return";
};

export const VideoClubPageTapeSelectMember = (props: Props) => {
  const [selectedMember, setSelectedMember] = useState<ExtendedMember | null>(
    null,
  );

  const navigate = useNavigate();
  const { create } = useNavigation();

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

  return (
    <VideoClubLayoutSubPage
      title="Select Member"
      help="You can browse all the members in the Refine Video Club."
      onClose={() => navigate("/video-club")}
      isLoading={membersQueryResult?.isLoading}
    >
      <Container>
        <Poster src={getImagesUrl("/members.jpg")} alt="members" />

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

      <Separator />

      <ActionContainer>
        <ActionButton disabled={true} type="button">
          <IconChevronLeft />
          <span>Back</span>
        </ActionButton>
        <ActionButton
          disabled={!selectedMember}
          type="button"
          onClick={() => {
            if (selectedMember) {
              const resource =
                props.variant === "rent" ? "rentals-rent" : "rentals-return";
              create(resource, "push", { memberId: selectedMember.id });
            }
          }}
        >
          <span>Next</span>
          <IconChevronRight />
        </ActionButton>
        <ActionButton
          type="button"
          onClick={() => {
            navigate("/video-club");
          }}
          style={{
            marginLeft: "12px",
          }}
        >
          Cancel
        </ActionButton>
      </ActionContainer>
    </VideoClubLayoutSubPage>
  );
};

const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 24px;
`;

const Poster = styled.img`
  min-width: 200px;
  min-height: 492px;
  max-width: 200px;
  max-height: 498px;
  aspect-ratio: 200 / 492;
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
