import React from "react";
import {
  type AutoSaveIndicatorProps,
  useTranslate,
  AutoSaveIndicator as AutoSaveIndicatorCore,
} from "@refinedev/core";
import { Typography, theme } from "antd";
import {
  EllipsisOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  elements: {
    success = (
      <Message
        translationKey="autoSave.success"
        defaultMessage="saved"
        icon={<CheckCircleOutlined />}
      />
    ),
    error = (
      <Message
        translationKey="autoSave.error"
        defaultMessage="auto save failure"
        icon={<ExclamationCircleOutlined />}
      />
    ),
    loading = (
      <Message
        translationKey="autoSave.loading"
        defaultMessage="saving..."
        icon={<SyncOutlined />}
      />
    ),
    idle = (
      <Message
        translationKey="autoSave.idle"
        defaultMessage="waiting for changes"
        icon={<EllipsisOutlined />}
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
  const { token } = theme.useToken();

  return (
    <Typography.Text
      style={{
        marginRight: 5,
        color: token.colorTextTertiary,
        fontSize: ".8rem",
      }}
    >
      {translate(translationKey, defaultMessage)}
      <span style={{ marginLeft: ".2rem" }}>{icon}</span>
    </Typography.Text>
  );
};
