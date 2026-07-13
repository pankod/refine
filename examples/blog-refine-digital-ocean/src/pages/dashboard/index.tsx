import { Row, Col } from "antd";

import { MetricCard } from "../../components/metricCard";
import { DealChart } from "../../components/dealChart";

export const Dashboard = () => {
  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} sm={24} xl={8}>
        <MetricCard variant="companies" />
      </Col>
      <Col xs={24} sm={24} xl={8}>
        <MetricCard variant="contacts" />
      </Col>
      <Col xs={24} sm={24} xl={8}>
        <MetricCard variant="deals" />
      </Col>
      <Col span={24}>
        <DealChart />
      </Col>
    </Row>
  );
};
