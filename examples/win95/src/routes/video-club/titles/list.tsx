import { useNavigate } from "react-router";
import {
  getDefaultFilter,
  useSubscription,
  useTable,
  Link,
} from "@refinedev/core";
import {
  Hourglass,
  Select,
  Table,
  TableBody,
  TableDataCell as DefaultTableDataCell,
  TableHead,
  TableHeadCell as DefaultTableHeadCell,
  TableRow,
  TextInput,
} from "react95";
import styled from "styled-components";
import { VideoClubLayoutSubPage } from "@/components/layout";
import { Pagination } from "@/components/pagination";
import { DangerIcon } from "@/components/icons";
import { OPTIONS_YEAR } from "@/utils/options-year";
import type { ExtendedVideoTitle } from "@/types";

export const VideoClubPageBrowseTitles = () => {
  const navigate = useNavigate();

  const {
    tableQuery: titlesQueryResult,
    pageCount,
    currentPage: current,
    setCurrentPage: setCurrent,
    filters,
    setFilters,
  } = useTable<ExtendedVideoTitle>({
    resource: "titles",

    meta: {
      select: "*, tapes(*), rentals(*)",
    },
  });
  const titles = titlesQueryResult?.data?.data || [];
  const titlesIsLoading = titlesQueryResult?.isLoading || false;
  const isLoading = titlesIsLoading;

  useSubscription({
    channel: "tapes",
    onLiveEvent: () => {
      titlesQueryResult.refetch();
    },
  });

  useSubscription({
    channel: "rentals",
    onLiveEvent: () => {
      titlesQueryResult.refetch();
    },
  });

  return (
    <VideoClubLayoutSubPage
      isLoading={isLoading}
      title="Browse Titles"
      help={"You can browse all the titles in the Refine Video Club."}
      onClose={() => navigate("/video-club")}
    >
      <Container>
        <FilterContainer>
          <FilterInputContainer>
            <FilterInputLabel>Title:</FilterInputLabel>
            <FilterInputText
              defaultValue={getDefaultFilter("title", filters, "contains")}
              onChange={(e) => {
                setCurrent(1);
                setFilters([
                  {
                    field: "title",
                    value: e.target.value,
                    operator: "contains",
                  },
                ]);
              }}
            />
          </FilterInputContainer>
          <FilterInputContainer>
            <FilterInputLabel>Movie ID:</FilterInputLabel>
            <FilterInputText
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
          </FilterInputContainer>
          <FilterInputContainer>
            <FilterInputLabel>Category:</FilterInputLabel>
            <FilterInputText
              defaultValue={getDefaultFilter("genres", filters, "ina")}
              onChange={(e) => {
                const value = e.target?.value?.trim();
                setCurrent(1);
                setFilters([
                  {
                    field: "genres",
                    value: value.split(",").map((v) => v.trim()),
                    operator: "ina",
                  },
                ]);
              }}
            />
          </FilterInputContainer>
          <FilterInputContainer>
            <FilterInputLabel>Year:</FilterInputLabel>
            <FilterInputSelect
              menuMaxHeight={160}
              defaultValue={getDefaultFilter("year", filters, "eq")}
              onChange={(option) => {
                setCurrent(1);
                setFilters([
                  { field: "year", value: option?.value, operator: "eq" },
                ]);
              }}
              options={[{ label: "All", value: null }, ...OPTIONS_YEAR]}
            />
          </FilterInputContainer>
        </FilterContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell $width={24} $px={5}>
                {""}
              </TableHeadCell>
              <TableHeadCell $width={32}>ID</TableHeadCell>
              <TableHeadCell $width={240}>Title</TableHeadCell>
              <TableHeadCell $width={120}>Category</TableHeadCell>
              <TableHeadCell $width={64}>Year</TableHeadCell>
              <TableHeadCell $width={64}>Copies</TableHeadCell>
              <TableHeadCell $width={82}>Rentals</TableHeadCell>
              <TableHeadCell $width={48}>{}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              titles.map((title) => {
                const atleastOneCopyAvailable = title.tapes.some(
                  (copy) => copy.available,
                );

                return (
                  <TableRow key={title.id}>
                    <TableDataCell $px={5} $width={24}>
                      {atleastOneCopyAvailable ? (
                        ""
                      ) : (
                        <DangerIcon message="Out of Stock" />
                      )}
                    </TableDataCell>
                    <TableDataCell $width={64}>{title.id}</TableDataCell>
                    <TableDataCell $width={240}>{title.title}</TableDataCell>
                    <TableDataCell $width={120} title={title.genres.join(", ")}>
                      {title.genres.join(", ")}
                    </TableDataCell>
                    <TableDataCell $width={64}>{title.year}</TableDataCell>
                    <TableDataCell $width={64}>
                      {title.tapes.length}
                    </TableDataCell>
                    <TableDataCell $width={82}>
                      {title.rentals.length}
                    </TableDataCell>
                    <TableDataCell $width={48} style={{ textAlign: "right" }}>
                      <Link
                        go={{
                          to: {
                            resource: "titles",
                            action: "show",
                            id: title.id,
                          },
                        }}
                      >
                        View
                      </Link>
                    </TableDataCell>
                  </TableRow>
                );
              })}
            {isLoading && <Hourglass size={32} style={{}} />}
          </TableBody>
        </Table>
        <Pagination
          pageCount={pageCount}
          current={current}
          setCurrent={setCurrent}
        />
      </Container>
    </VideoClubLayoutSubPage>
  );
};

const Container = styled.div`
  padding: 16px 24px;
`;

const FilterContainer = styled.div`
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 372px 200px;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px 32px;
`;

const FilterInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterInputLabel = styled.div`
  width: 104px;
`;

const FilterInputText = styled(TextInput)`
    flex: 1;
`;

const FilterInputSelect = styled(Select)`
  flex: 1;
`;

const TableDataCell = styled(DefaultTableDataCell)<{
  $width?: number;
  $px?: number;
}>`
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
}>`
  text-align: left;
  max-width: ${({ $width }) => `${$width}px`};
  min-width: ${({ $width }) => `${$width}px`};
  width: ${({ $width }) => `${$width}px`};
  ${({ $px }) =>
    typeof $px !== "undefined" &&
    `padding-left: ${$px}px; padding-right: ${$px}px;`}
`;
