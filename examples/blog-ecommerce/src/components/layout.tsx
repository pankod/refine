import type { LayoutProps } from "@refinedev/core";
import { Box, Container, Flex, Image, Button } from "@chakra-ui/react";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      backgroundColor={"#eeeeee"}
      minH={"100vh"}
    >
      <Container maxW={"container.lg"}>
        <Flex justify={"space-between"} mt={18} alignSelf={"center"}>
          <a href="https://refine.dev">
            <Image alt="Refine Logo" src={"./refine_logo.png"} />
          </a>
          <Button className="snipcart-checkout" colorScheme={"teal"}>
            <span style={{ marginRight: "4px" }}>Basket Total:</span>
            <span className="snipcart-total-price" />
          </Button>
        </Flex>
        {children}
      </Container>
    </Box>
  );
};
