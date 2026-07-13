import type { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";

type Props = {
  dataLength: number;
  hasMore: boolean;
  scrollableTarget: string;
  loading: boolean;
  noDataText: string;
  noDataIcon: ReactNode;
  children: ReactNode;
  next: () => void;
};

export const RequestsList = (props: Props) => {
  const hasData = props.dataLength > 0 || props.loading;
  if (!hasData) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {props.noDataIcon}
        <Typography variant="body2" color="text.secondary">
          {props.noDataText || "No data."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        id={props.scrollableTarget}
        sx={(theme) => ({
          maxHeight: "600px",
          [theme.breakpoints.up("lg")]: {
            height: "600px",
          },
          overflow: "auto",
          ...((props.dataLength > 6 || props.loading) && {
            "&::after": {
              pointerEvents: "none",
              content: '""',
              zIndex: 1,
              position: "absolute",
              bottom: "0",
              left: "12px",
              right: "12px",
              width: "calc(100% - 24px)",
              height: "60px",
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0), #FFFFFF)",
            },
          }),
        })}
      >
        <InfiniteScroll
          dataLength={props.dataLength}
          hasMore={props.hasMore}
          next={props.next}
          scrollableTarget={props.scrollableTarget}
          endMessage={
            !props.loading &&
            props.dataLength > 6 && (
              <Box
                sx={{
                  pt: "40px",
                }}
              />
            )
          }
          loader={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100px",
              }}
            >
              <CircularProgress size={24} />
            </Box>
          }
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {props.loading ? <SkeletonList /> : props.children}
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

const SkeletonList = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <Box
          key={index}
          sx={(theme) => ({
            paddingRight: "24px",
            paddingLeft: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: "12px",
            paddingTop: "12px",
            paddingBottom: "4px",

            [theme.breakpoints.up("sm")]: {
              paddingTop: "20px",
              paddingBottom: "12px",
            },

            "& .MuiSkeleton-rectangular": {
              borderRadius: "2px",
            },
          })}
        >
          <Skeleton variant="rectangular" width="64px" height="12px" />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              sx={{
                flexShrink: 0,
              }}
            />
            <Box
              sx={(theme) => ({
                height: "auto",
                width: "100%",
                [theme.breakpoints.up("md")]: {
                  height: "48px",
                },
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                gap: "8px",
              })}
            >
              <Skeleton
                variant="rectangular"
                sx={(theme) => ({
                  width: "100%",
                  [theme.breakpoints.up("sm")]: {
                    width: "120px",
                  },
                })}
                height="16px"
              />
              <Skeleton
                variant="rectangular"
                sx={(theme) => ({
                  width: "100%",
                  [theme.breakpoints.up("sm")]: {
                    width: "230px",
                  },
                })}
                height="12px"
              />
            </Box>
            <Button
              size="small"
              color="inherit"
              sx={(theme) => ({
                display: "none",
                [theme.breakpoints.up("sm")]: {
                  display: "block",
                },

                alignSelf: "flex-start",
                flexShrink: 0,
                marginLeft: "auto",
              })}
            >
              View Request
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
};
