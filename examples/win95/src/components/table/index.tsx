import styled from "styled-components";
import {
  Table as DefaultTable,
  TableBody as DefaultTableBody,
  TableDataCell as DefaultTableDataCell,
  TableHead as DefaultTableHead,
  TableHeadCell as DefaultTableHeadCell,
  TableRow as DefaultTableRow,
  Select,
  TextInput,
} from "react95";

export const Table = styled(DefaultTable)``;

export const TableHead = styled(DefaultTableHead)``;

export const TableBody = styled(DefaultTableBody)`
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableRow = styled(DefaultTableRow)<{ $selected?: boolean }>`
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.hoverBackground : "inherit"};
  color: ${({ $selected }) => ($selected ? "white" : "inherit")};
`;

export const TableDataCell = styled(DefaultTableDataCell)<{
  $width?: number;
  $px?: number;
  $textAlign?: "left" | "right" | "center";
}>`
  max-width: ${({ $width }) => `${$width}px`};
  min-width: ${({ $width }) => `${$width}px`};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  text-align: ${({ $textAlign }) => $textAlign || "left"};
  ${({ $px }) =>
    typeof $px !== "undefined" &&
    `padding-left: ${$px}px; padding-right: ${$px}px;`}
`;

export const TableHeadCell = styled(DefaultTableHeadCell)<{
  $width?: number;
  $px?: number;
  $textAlign?: "left" | "right" | "center";
}>`
  text-align: ${({ $textAlign }) => $textAlign || "left"};
  max-width: ${({ $width }) => `${$width}px`};
  min-width: ${({ $width }) => `${$width}px`};
  width: ${({ $width }) => `${$width}px`};
  ${({ $px }) =>
    typeof $px !== "undefined" &&
    `padding-left: ${$px}px; padding-right: ${$px}px;`}
`;

export const TableFilterContainer = styled.div`
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px 32px;
`;

export const TableFilterInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TableFilterInputLabel = styled.div`
  width: 104px;
`;

export const TableFilterInputText = styled(TextInput)`
  flex: 1;
`;

export const TableFilterInputSelect = styled(Select)`
  flex: 1;
`;
