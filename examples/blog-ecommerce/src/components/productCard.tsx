import React from "react";
import { Box, Image, Badge, Button } from "@chakra-ui/react";

export type ProductProps = {
  id: string;
  title: string;
  description: string;
  cardImage: string;
};

export const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  description,
  cardImage,
}) => {
  return (
    <Box
      maxH={"sm"}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image w={"100%"} h={200} src={cardImage} />
      <Box p="6" bgColor={"gray.600"}>
        <Box display="flex" alignItems="baseline" mb={2} ml={-2}>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New Product
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          color={"white"}
        >
          {title}
        </Box>

        <Box
          color="white"
          fontSize="sm"
          display={"flex"}
          mt={4}
          justifyContent={"flex-end"}
        >
          <Button
            className="buy-button snipcart-add-item"
            bgColor={"green.400"}
            data-item-id={id}
            data-item-price="5"
            data-item-url="/"
            data-item-name={title}
            data-item-description={description}
            data-item-image={cardImage}
          >
            Add to Basket
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
