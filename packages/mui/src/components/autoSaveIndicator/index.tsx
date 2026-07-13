import React from "react";
import {
  type AutoSaveIndicatorProps,
  useTranslate,
  AutoSaveIndicator as AutoSaveIndicatorCore,
} from "@refinedev/core";
import Typography from "@mui/material/Typography";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  elements: {
    success = (
      <Message
        translationKey="autoSave.success"
        defaultMessage="saved"
        icon={<TaskAltOutlinedIcon fontSize="small" />}
      />
    ),
    error = (
      <Message
        translationKey="autoSave.error"
        defaultMessage="auto save failure"
        icon={<ErrorOutlineOutlinedIcon fontSize="small" />}
      />
    ),
    loading = (
      <Message
        translationKey="autoSave.loading"
        defaultMessage="saving..."
        icon={<SyncOutlinedIcon fontSize="small" />}
      />
    ),
    idle = (
      <Message
        translationKey="autoSave.idle"
        defaultMessage="waiting for changes"
        icon={<MoreHorizOutlinedIcon fontSize="small" />}
      />
    ),
  } = {},
}) => {
  return (
    <AutoSaveIndicatorCore
      status={status}
      elements={{
        success,
        error,
        loading,
        idle,
      }}
    />
  );
};

const Message = ({
  translationKey,
  defaultMessage,
  icon,
}: {
  translationKey: string;
  defaultMessage: string;
  icon: React.ReactNode;
}) => {
  const translate = useTranslate();

  return (
    <Typography
      color="gray"
      fontSize="0.8rem"
      position="relative"
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      marginRight=".3rem"
    >
      {translate(translationKey, defaultMessage)}
      <span style={{ position: "relative", top: "3px", marginLeft: "3px" }}>
        {icon}
      </span>
    </Typography>
  );
};
