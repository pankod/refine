import { useState, useEffect } from "react";
import { Link, useList } from "@refinedev/core";
import { SearchOutlined } from "@ant-design/icons";
import { Layout as AntdLayout, AutoComplete, Input, Typography } from "antd";
import debounce from "lodash/debounce";

import type { ICategory, IOptions, IPost } from "../interfaces";

const { Text } = Typography;

const renderTitle = (title: string) => {
  return (
    <Text strong style={{ fontSize: "16px" }}>
      {title}
    </Text>
  );
};

const renderItem = (title: string, resource: string, id: number) => {
  return {
    value: title,
    label: (
      <Link to={`/${resource}/show/${id}`}>
        <Text>{title}</Text>
      </Link>
    ),
  };
};

export const Header: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<IOptions[]>([]);

  const {
    result: postsData,
    query: { refetch: refetchPosts },
  } = useList<IPost>({
    resource: "posts",

    queryOptions: {
      enabled: false,
    },

    filters: [{ field: "title", operator: "contains", value }],
  });

  const {
    result: categoriesData,
    query: { refetch: refetchCategories },
  } = useList<ICategory>({
    resource: "categories",

    queryOptions: {
      enabled: false,
    },

    filters: [{ field: "title", operator: "contains", value }],
  });

  useEffect(() => {
    if (postsData) {
      const postOptionGroup = postsData.data.map((item) =>
        renderItem(item.title, "posts", item.id),
      );
      if (postOptionGroup.length > 0) {
        setOptions((prevOptions) => [
          ...prevOptions,
          {
            label: renderTitle("Posts"),
            options: postOptionGroup,
          },
        ]);
      }
    }
  }, [postsData]);

  useEffect(() => {
    if (categoriesData) {
      const categoryOptionGroup = categoriesData.data.map((item) =>
        renderItem(item.title, "categories", item.id),
      );
      if (categoryOptionGroup.length > 0) {
        setOptions((prevOptions) => [
          ...prevOptions,
          {
            label: renderTitle("Categories"),
            options: categoryOptionGroup,
          },
        ]);
      }
    }
  }, [categoriesData]);

  useEffect(() => {
    setOptions([]);
    refetchPosts();
    refetchCategories();
  }, [value]);

  return (
    <AntdLayout.Header
      style={{
        padding: "0px 24px",
        backgroundColor: "#FFF",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <AutoComplete
        style={{ width: "100%", maxWidth: "550px" }}
        options={options}
        filterOption={false}
        onSearch={debounce((value: string) => setValue(value), 500)}
      >
        <Input
          size="large"
          placeholder="Search posts or categories"
          suffix={<SearchOutlined />}
        />
      </AutoComplete>
    </AntdLayout.Header>
  );
};
