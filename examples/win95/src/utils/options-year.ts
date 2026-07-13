// fill with years from 1980 to current year
export const OPTIONS_YEAR = Array.from(
  { length: new Date().getFullYear() - 1980 + 1 },
  (_, i) => 1980 + i,
).map((year) => ({
  label: year.toString(),
  value: year.toString(),
}));
