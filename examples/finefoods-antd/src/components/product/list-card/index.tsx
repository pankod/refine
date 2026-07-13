import {
  type HttpError,
  useGo,
  useList,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
import { NumberField, useSimpleList } from "@refinedev/antd";
import type { ICategory, IProduct } from "../../../interfaces";
import {
  Card,
  Divider,
  Flex,
  List,
  Skeleton,
  Tag,
  Typography,
  theme,
} from "antd";
import { ProductStatus } from "../status";
import { PaginationTotal } from "../../paginationTotal";
import { EyeOutlined, TagOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useStyles } from "./styled";
import { useLocation } from "react-router";

export const ProductListCard = () => {
  const { styles, cx } = useStyles();
  const { token } = theme.useToken();
  const t = useTranslate();
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();

  const //`useSimpleList` does not accept all of Ant Design's `List` component props anymore. You can directly use `List` component instead.,
    {
      listProps: productListProps,
      filters,
      setFilters,
    } = useSimpleList<IProduct, HttpError>({
      pagination: {
        currentPage: 1,
        pageSize: 12,
      },
      filters: {
        initial: [
          {
            field: "category.id",
            operator: "in",
            value: [],
          },
        ],
      },
    });

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useList<ICategory, HttpError>({
    resource: "categories",
    pagination: {
      mode: "off",
    },
  });
  const categories = categoryData?.data || [];

  const categoryFilters = useMemo(() => {
    const filter = filters.find((filter) => {
      if ("field" in filter) {
        return filter.field === "category.id";
      }

      return false;
    });

    const filterValues = filter?.value?.map((value: string | number) =>
      Number(value),
    );

    return {
      operator: filter?.operator || "in",
      value: (filterValues || []) as number[],
    };
  }, [filters]).value;

  const hasCategoryFilter = categoryFilters?.length > 0;

  const handleOnTagClick = (categoryId: number) => {
    const newFilters = categoryFilters;
    const hasCurrentFilter = newFilters.includes(categoryId);
    if (hasCurrentFilter) {
      newFilters.splice(newFilters.indexOf(categoryId), 1);
    } else {
      newFilters.push(categoryId);
    }

    setFilters([
      {
        field: "category.id",
        operator: "in",
        value: newFilters,
      },
    ]);
  };

  return (
    <>
      <Divider style={{ margin: "16px 0px" }} />
      <Flex
        wrap="nowrap"
        gap={12}
        style={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Tag
          style={{ padding: "4px 10px 4px 10px", cursor: "pointer" }}
          color={!hasCategoryFilter ? token.colorPrimary : undefined}
          icon={<TagOutlined />}
          onClick={() => {
            setFilters([
              {
                field: "category.id",
                operator: "in",
                value: [],
              },
            ]);
          }}
        >
          {t("products.filter.allCategories.label")}
        </Tag>
        {!categoryIsLoading &&
          categories.map((category) => (
            <Tag
              key={category.id}
              color={
                categoryFilters?.includes(category.id) ? "orange" : undefined
              }
              style={{
                padding: "4px 10px 4px 10px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleOnTagClick(category.id);
              }}
            >
              {category.title}
            </Tag>
          ))}

        {categoryIsLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton.Button
              key={index}
              style={{
                width: "108px",
                height: "30px",
              }}
              active
            />
          ))}
      </Flex>
      <Divider style={{ margin: "16px 0px" }} />
      <List
        {...productListProps}
        pagination={{
          ...productListProps.pagination,
          showTotal: (total) => (
            <PaginationTotal total={total} entityName={"products"} />
          ),
        }}
        grid={{
          gutter: [16, 16],
          column: 4,
          xxl: 4,
          xl: 4,
          lg: 3,
          md: 2,
          sm: 1,
          xs: 1,
        }}
        renderItem={(item) => (
          <List.Item style={{ height: "100%" }}>
            <Card
              hoverable
              bordered={false}
              className={styles.card}
              styles={{
                body: {
                  padding: 16,
                },
                cover: {
                  position: "relative",
                },
                actions: {
                  marginTop: "auto",
                },
              }}
              cover={
                <>
                  <Tag
                    onClick={() => {
                      return go({
                        to: `${showUrl("products", item.id)}`,
                        query: {
                          to: pathname,
                        },
                        options: {
                          keepQuery: true,
                        },
                        type: "replace",
                      });
                    }}
                    className={cx(styles.viewButton, "viewButton")}
                    icon={<EyeOutlined />}
                  >
                    View
                  </Tag>
                  <img
                    src={item.images[0].url}
                    alt={item.images[0].name}
                    style={{
                      aspectRatio: 288 / 160,
                      objectFit: "cover",
                    }}
                  />
                </>
              }
              actions={[
                <Flex
                  key="actions"
                  justify="space-between"
                  style={{
                    padding: "0 16px",
                  }}
                >
                  <Typography.Text key="category.title">
                    {
                      categories.find(
                        (category) => category.id === item.category.id,
                      )?.title
                    }
                  </Typography.Text>
                  <ProductStatus key="status" value={item.isActive} />
                </Flex>,
              ]}
            >
              <Card.Meta
                title={
                  <Flex>
                    <Typography.Title
                      level={5}
                      ellipsis={{
                        rows: 1,
                        tooltip: item.name,
                      }}
                    >
                      {item.name}
                    </Typography.Title>

                    <NumberField
                      value={item.price}
                      style={{
                        paddingLeft: "8px",
                        marginLeft: "auto",
                      }}
                      options={{
                        style: "currency",
                        currency: "USD",
                      }}
                    />
                  </Flex>
                }
                description={item.description}
              />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};
