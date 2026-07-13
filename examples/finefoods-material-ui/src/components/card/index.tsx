import type { PropsWithChildren } from "react";
import CardBase, { type CardProps } from "@mui/material/Card";
import CardHeader, { type CardHeaderProps } from "@mui/material/CardHeader";
import CardContent, { type CardContentProps } from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

type Props = {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  cardHeaderProps?: CardHeaderProps;
  cardContentProps?: CardContentProps;
} & CardProps;

export const Card = ({
  icon,
  title,
  cardHeaderProps,
  cardContentProps,
  children,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <CardBase
      {...rest}
      sx={{
        ".MuiCardContent-root:last-child": {
          paddingBottom: "0px",
        },
        height: "100%",
        ...rest.sx,
      }}
    >
      <CardHeader
        title={
          <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
            {title}
          </Typography>
        }
        avatar={icon}
        sx={{
          height: "56px",
          ".MuiCardHeader-avatar": {
            color: "primary.main",
            marginRight: "8px",
          },
          ".MuiCardHeader-action": {
            margin: 0,
          },
        }}
        {...cardHeaderProps}
      />
      <Divider />
      <CardContent
        {...cardContentProps}
        sx={{
          ...cardContentProps?.sx,
          padding: 0,
        }}
      >
        {children}
      </CardContent>
    </CardBase>
  );
};
