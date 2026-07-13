import { useTable, useNavigation } from "@refinedev/core";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Hourglass,
} from "react95";

import type { ICategory } from "../../interfaces";

export const CategoryList = () => {
  const { tableQuery: tableQueryResult } = useTable<ICategory>({
    resource: "categories",
  });

  const { edit } = useNavigation();

  return (
    <Window style={{ width: "100%" }}>
      <WindowHeader>Categories</WindowHeader>
      <WindowContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableQueryResult.data?.data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableDataCell>{item.id}</TableDataCell>
                  <TableDataCell>{item.title}</TableDataCell>
                  <TableDataCell
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="sm"
                      onClick={() => {
                        edit("categories", item.id);
                      }}
                    >
                      Edit
                    </Button>
                  </TableDataCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {tableQueryResult.isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "350px",
            }}
          >
            <Hourglass size={32} />
          </div>
        )}
      </WindowContent>
    </Window>
  );
};
