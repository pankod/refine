import { useList } from "@refinedev/core";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type Color = {
  id: number;
  name: string | null;
  hex: string;
  red: number | null;
  green: number | null;
  blue: number | null;
  hue: number | null;
  sat_hsl: number | null;
  light_hsl: number | null;
  sat_hsv: number | null;
  val_hsv: number | null;
  source: string | null;
};

const formatValue = (value: number | null, suffix = "") => {
  if (value === null) {
    return "-";
  }

  return `${value}${suffix}`;
};

const loadingRows = Array.from({ length: 5 }, (_, index) => index);

export const Colors = () => {
  const { result, query } = useList<Color>({
    resource: "colors",
    pagination: { mode: "off" },
    sorters: [{ field: "id", order: "asc" }],
  });

  const colors = result?.data ?? [];
  const isLoading = query.isLoading;

  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm shadow-zinc-950/5 dark:shadow-black/20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Preview</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>RGB</TableHead>
            <TableHead>HSL</TableHead>
            <TableHead>HSV</TableHead>
            <TableHead>Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? loadingRows.map((row) => (
                <TableRow key={`loading-${row}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-4 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))
            : colors.map((color) => (
                <TableRow key={color.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="size-4 rounded-full border border-border shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-mono text-xs uppercase text-muted-foreground">
                        {color.hex}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{color.name ?? "Untitled"}</TableCell>
                  <TableCell>
                    {[
                      formatValue(color.red),
                      formatValue(color.green),
                      formatValue(color.blue),
                    ].join(" / ")}
                  </TableCell>
                  <TableCell>
                    {[
                      formatValue(color.hue),
                      formatValue(color.sat_hsl, "%"),
                      formatValue(color.light_hsl, "%"),
                    ].join(" / ")}
                  </TableCell>
                  <TableCell>
                    {[
                      formatValue(color.hue),
                      formatValue(color.sat_hsv, "%"),
                      formatValue(color.val_hsv, "%"),
                    ].join(" / ")}
                  </TableCell>
                  <TableCell>{color.source ?? "-"}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};
