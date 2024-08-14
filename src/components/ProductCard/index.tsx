import { Flex, Img, Text } from "@chakra-ui/react";
import { Product } from "../../types";

export default function ProductCard(product: Product) {
  return (
    <Flex
      direction="column"
      key={product.id}
      w="250px"
      borderRadius={8}
      overflow="hidden"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
      mb="36px"
    >
      <Img
        src={product.image.url}
        w="100%"
        h="250px"
        objectFit="cover"
        
      />
      <Flex direction="column" gap="8px" p="8px">
      <Text>Name {product.productName}</Text>
      <Text>Price £{product.price.priceIncTax}</Text>
      </Flex>
    </Flex>
  );
}
