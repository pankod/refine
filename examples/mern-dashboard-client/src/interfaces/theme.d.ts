/*eslint-disable */
import "@refinedev/mui";
export interface CustomTheme {
    // Add custom variables here like below:
    // status: {
    //   danger: string;
    // };
}

declare module "@mui/material/styles" {
    // @ts-ignore
    interface Theme extends import("@mui/material/styles").Theme, CustomTheme {}
    interface ThemeOptions
        // @ts-ignore
        extends import("@mui/material/styles").ThemeOptions,
            CustomTheme {}
}
/*eslint-enable */
