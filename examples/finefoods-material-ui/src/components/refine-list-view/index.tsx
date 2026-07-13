import { List, type ListProps } from "@refinedev/mui";

type Props = {} & ListProps;

export const RefineListView = ({ children, ...props }: Props) => {
  return (
    <List
      {...props}
      headerProps={{
        sx: {
          display: "flex",
          flexWrap: "wrap",
          ".MuiCardHeader-action": {
            margin: 0,
            alignSelf: "center",
          },
          height: "72px",
        },
      }}
      headerButtonProps={{
        alignItems: "center",
        ...props.headerButtonProps,
      }}
      wrapperProps={{
        sx: {
          backgroundColor: "transparent",
          backgroundImage: "none",
          boxShadow: "none",
          ...props.wrapperProps?.sx,
        },
      }}
    >
      {children}
    </List>
  );
};
