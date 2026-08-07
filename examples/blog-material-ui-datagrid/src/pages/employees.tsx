import React from "react";
import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const EmployeeList: React.FC = () => {
  const { dataGridProps, setFilters } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", minWidth: 30 },
      {
        field: "full_name",
        headerName: "Full Name",
        minWidth: 150,
        flex: 1,
        valueGetter: (_, row) =>
          `${row.first_name || ""} ${row.last_name || ""}`,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 250,
      },
      {
        field: "department",
        headerName: "Department",
        minWidth: 150,
      },
      {
        field: "role",
        headerName: "Role",
        minWidth: 150,
      },
      {
        field: "level",
        headerName: "Level",
        minWidth: 110,
      },
    ],
    [],
  );

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setFilters([
      {
        field: "role",
        value: checked ? "Recruiter" : undefined,
        operator: "eq",
      },
    ]);
  };

  return (
    <List>
      <FormControlLabel
        label="Filter Employees with Recruiter Role"
        control={<Checkbox onChange={handleFilter} />}
      />
      <DataGrid
        {...dataGridProps}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
      />
    </List>
  );
};
export default EmployeeList;
