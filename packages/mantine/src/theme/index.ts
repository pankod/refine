import type { MantineTheme, MantineThemeOverride } from "@mantine/core";

const commonThemeProperties: Partial<MantineThemeOverride> = {
  fontFamily: [
    "Montserrat",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  colors: {
    primary: [
      "#F1FBE9",
      "#D8F4C3",
      "#BFED9C",
      "#A7E675",
      "#8EDE4E",
      "#75D728",
      "#5DAC20",
      "#468118",
      "#2F5610",
      "#172B08",
    ],
  },
  black: "#626262",
  primaryColor: "primary",
  defaultRadius: 6,
  headings: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    Table: {
      styles: (theme) =>
        theme.colorScheme === "light"
          ? {
              root: {
                "thead>tr>th": {
                  backgroundColor: "#fafafa",
                  padding: "16px 4px",
                },
                "thead>tr>th:first-of-type": {
                  borderTopLeftRadius: theme.defaultRadius,
                },
                "thead>tr>th:last-of-type": {
                  borderTopRightRadius: theme.defaultRadius,
                },
                "tbody>tr>td": {
                  borderBottom: "1px solid #f0f0f0",
                },
              },
            }
          : { root: {} },
    },
  },
};

export const LightTheme: Partial<MantineThemeOverride> = {
  colorScheme: "light",
  ...commonThemeProperties,
};

export const DarkTheme: Partial<MantineThemeOverride> = {
  colorScheme: "dark",
  ...commonThemeProperties,
};

const refineColors = {
  Blue: {
    colors: [
      "#E7F5FF",
      "#D0EBFF",
      "#A5D8FF",
      "#74C0FC",
      "#4DABF7",
      "#339AF0",
      "#228BE6",
      "#1C7ED6",
      "#1971C2",
      "#1864AB",
    ],
  },
  Purple: {
    colors: [
      "#F3F0FF",
      "#E5DBFF",
      "#D0BFFF",
      "#B197FC",
      "#9775FA",
      "#845EF7",
      "#7950F2",
      "#7048E8",
      "#6741D9",
      "#5F3DC4",
    ],
  },
  Magenta: {
    colors: [
      "#FFF0F6",
      "#FFDEEB",
      "#FCC2D7",
      "#FAA2C1",
      "#F783AC",
      "#F06595",
      "#E64980",
      "#D6336C",
      "#C2255C",
      "#A61E4D",
    ],
  },
  Red: {
    colors: [
      "#FFF5F5",
      "#FFE3E3",
      "#FFC9C9",
      "#FFA8A8",
      "#FF8787",
      "#FF6B6B",
      "#FA5252",
      "#F03E3E",
      "#E03131",
      "#C92A2A",
    ],
  },
  Orange: {
    colors: [
      "#FFF4E6",
      "#FFE8CC",
      "#FFD8A8",
      "#FFC078",
      "#FFA94D",
      "#FF922B",
      "#FD7E14",
      "#F76707",
      "#E8590C",
      "#D9480F",
    ],
  },
  Yellow: {
    colors: [
      "#FFF9DB",
      "#FFF3BF",
      "#FFEC99",
      "#FFE066",
      "#FFD43B",
      "#FCC419",
      "#FAB005",
      "#F59F00",
      "#F08C00",
      "#E67700",
    ],
  },
  Green: {
    colors: [
      "#EBFBEE",
      "#D3F9D8",
      "#B2F2BB",
      "#8CE99A",
      "#69DB7C",
      "#51CF66",
      "#40C057",
      "#37B24D",
      "#2F9E44",
      "#2B8A3E",
    ],
  },
} as const;

export const RefineThemes = Object.keys(refineColors).reduce((acc, key) => {
  const themeName = key as keyof typeof refineColors;
  return {
    ...acc,
    [themeName]: {
      globalStyles: (theme: MantineTheme) => ({
        body: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }),

      colors: {
        brand: refineColors[themeName].colors,
      },
      primaryColor: "brand",
    },
  };
}, {}) as Record<keyof typeof refineColors, MantineThemeOverride>;
