import {
  DeleteButton,
  UrlField,
  EmailField,
  EditButton,
} from "@refinedev/antd";

import { Card, Typography } from "antd";

import type { ICompany } from "interfaces";
import { API_URL } from "../../constants";

const { Title, Text } = Typography;

type CompanyItemProps = {
  item: ICompany;
  editShow: (id?: string | undefined) => void;
};

export const CompanyItem: React.FC<CompanyItemProps> = ({ item, editShow }) => {
  const image = item.logo ? API_URL + item.logo.url : "./error.png";

  return (
    <Card
      style={{ width: "300px" }}
      cover={
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{
              width: 220,
              height: 100,
              padding: 24,
            }}
            src={image}
            alt="logo"
          />
        </div>
      }
      actions={[
        <EditButton
          key="edit"
          size="small"
          hideText
          onClick={() => editShow(item.id)}
        />,
        <DeleteButton
          key="delete"
          size="small"
          hideText
          recordItemId={item.id}
        />,
      ]}
    >
      <Title level={5}>Company Name:</Title>
      <Text>{item.name}</Text>
      <Title level={5}>Company Address:</Title>
      <Text>{item.address}</Text>
      <Title level={5}>County:</Title>
      <Text>{item.country}</Text>
      <Title level={5}>City:</Title>
      <Text>{item.city}</Text>
      <Title level={5}>Email:</Title>
      <EmailField value={item.email} />
      <Title level={5}>Website:</Title>
      <UrlField value={item.website} />
    </Card>
  );
};
