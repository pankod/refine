import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type CircularDeterminateProps = {
  undoableTimeout: number;
  message: string;
};

export const CircularDeterminate: React.FC<CircularDeterminateProps> = ({
  undoableTimeout,
  message,
}) => {
  const [progress, setProgress] = useState(100);

  const [timeCount, setTimeCount] = useState(undoableTimeout);

  useEffect(() => {
    const increaseProgress = 100 / undoableTimeout;
    const timer = setInterval(() => {
      setTimeCount((prevProgress) => prevProgress - 1);
      setProgress((prevProgress) => prevProgress - increaseProgress);
    }, 1000);

    if (timeCount === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeCount]);

  return (
    <>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          color="inherit"
          variant="determinate"
          value={progress}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="div">{timeCount}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginLeft: "10px",
          maxWidth: { xs: "150px", md: "100%" },
        }}
      >
        <Typography variant="subtitle2">{message}</Typography>
      </Box>
    </>
  );
};
