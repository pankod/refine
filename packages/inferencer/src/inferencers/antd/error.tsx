import React from "react";
import { Alert, Row, Col } from "antd";

import type { CreateInferencerConfig } from "../../types";

export const ErrorComponent: CreateInferencerConfig["errorComponent"] = ({
  error,
}) => {
  if (error) {
    return (
      <Row justify="center" align="middle" style={{ minHeight: "200px" }}>
        <Col>
          <Alert
            message="Error"
            description={
              <div
                // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
                dangerouslySetInnerHTML={{
                  __html: error ?? "",
                }}
              />
            }
            type="error"
            showIcon
          />
        </Col>
      </Row>
    );
  }

  return null;
};
