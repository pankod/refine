import type { GetServerSideProps } from "next";
import { type GetListResponse, useTable } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";
import { Button, SimpleGrid, Flex, Text } from "@chakra-ui/react";

import { API_URL } from "src/constants";
import type { IProduct, IStore } from "src/interfaces";
import { ProductCard, FilterButton } from "src/components";

type ItemProps = {
  products: GetListResponse<IProduct>;
  stores: IStore[];
};

export const ProductList: React.FC<ItemProps> = ({ products, stores }) => {
  const {
    tableQuery: tableQueryResult,
    setFilters,
    currentPage,
    setCurrentPage,
    pageSize,
  } = useTable<IProduct>({
    resource: "products",

    queryOptions: {
      initialData: products,
    },

    meta: { populate: ["image"] },

    pagination: {
      pageSize: 9,
    },
  });

  const totalPageCount = Math.ceil(
    (tableQueryResult.data?.total ?? 0) / pageSize,
  );

  return (
    <>
      <Flex mt={6} gap={2}>
        <FilterButton
          setFilters={() =>
            setFilters([
              {
                field: "stores][id]",
                operator: "eq",
                value: undefined,
              },
            ])
          }
        >
          <Text fontSize={{ base: "12px", md: "14px", lg: "14px" }}>
            All Products
          </Text>
        </FilterButton>
        {stores?.map((item) => {
          return (
            <FilterButton
              key={item.id}
              setFilters={() =>
                setFilters([
                  {
                    field: "stores][id]",
                    operator: "eq",
                    value: item.id,
                  },
                ])
              }
            >
              <Text
                fontSize={{
                  base: "12px",
                  md: "14px",
                  lg: "14px",
                }}
              >
                {item.title}
              </Text>
            </FilterButton>
          );
        })}
      </Flex>

      <SimpleGrid columns={[1, 2, 3]} mt={6} spacing={3}>
        {tableQueryResult.data?.data.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            cardImage={item.image ? API_URL + item.image.url : "./error.png"}
          />
        ))}
      </SimpleGrid>

      <Flex justify={"flex-end"} mt={4} mb={4} gap={2}>
        {Array.from(Array(totalPageCount), (e, i) => {
          if (currentPage > totalPageCount) {
            setCurrentPage(i);
          }
          return (
            <Button
              key={i}
              colorScheme={"teal"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          );
        })}
      </Flex>
    </>
  );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await DataProvider(`${API_URL}/api`).getList<IProduct>({
    resource: "products",
    meta: { populate: ["image"] },
    pagination: { currentPage: 1, pageSize: 9 },
  });

  const { data: storesData } =
    (await DataProvider(`${API_URL}/api`).getMany?.({
      resource: "stores",
      ids: ["1", "2", "3"],
    })) ?? {};

  return {
    props: { products: data, stores: storesData },
  };
};
