import { Button, Flex } from "@chakra-ui/react";
import { QUERY_PRODUCTS } from "../../util/const";

type ProductCategoriesProps = {
  handleButtonClick: (s: string) => void;
};

export default function ProductCategories({
  handleButtonClick,
}: ProductCategoriesProps) {
  return (
    <Flex gap="16px" mb="16px" align="center">
      {QUERY_PRODUCTS.map((product) => (
        <Button
          key={product.id}
          h="24px"
          onClick={() => handleButtonClick(product.value)}
        >
          {product.name}
        </Button>
      ))}
    </Flex>
  );
}
