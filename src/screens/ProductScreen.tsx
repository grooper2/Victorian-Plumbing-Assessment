import { Button, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PriceFilter from "../components/Filters";
import { getProducts } from "../api/products";
import { FacetOption, MappedFilters, ResponseData } from "../types";
import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProductCategories from "../components/ProductsCategories";
import SortByDropdown from "../components/SortBy";

export default function ProductScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParameters] = useSearchParams();
  const [results, setResults] = useState<ResponseData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const curentPage = Number(searchParameters.get("page"));

  const itemsPerPage = 20; 

  async function fetchProdcuts(
    sort?: string,
    query?: string,
    mapped?: MappedFilters,
    page?: number
  ) {
    setIsLoading(true);
    const res = (await getProducts({
      query: query,
      sort: Number(sort),
      facets: mapped,
      pageNumber: page,
    })) as ResponseData;
    setIsLoading(false);

    if (res) {
      setResults(res);
    }
  }

  useEffect(() => {
    fetchProdcuts();
    if (location.search) {
      navigate(location.pathname, { replace: true });
    }
  }, []);

  useEffect(() => {
    const parsedFilters: Record<string, string[]> = {};

    searchParams.forEach((value, key) => {
      parsedFilters[key] = value.split(",");
    });

    const mapped: Record<string, FacetOption[]> = {};
    const query = searchParameters.get("query");
    const sort = searchParameters.get("sort");
    const page = searchParameters.get("page") || "1"; // Get the current page from URL

    if (results) {
      Object.keys(parsedFilters).forEach((facetIdentifier) => {
        const facet = results.facets.find(
          (f) => f.identifier === facetIdentifier
        );

        if (facet) {
          const selectedOptions = parsedFilters[facetIdentifier]
            .map((optionIdentifier) => {
              return facet.options.find(
                (option) => option.identifier === optionIdentifier
              );
            })
            .filter((option) => option !== undefined);

          if (selectedOptions.length > 0) {
            mapped[facetIdentifier] = selectedOptions as FacetOption[];
          }
        }
      });

      fetchProdcuts(sort ?? "1", query ?? "toilets", mapped, Number(page));
    }
  }, [location.search]);

  const handleButtonClick = (value: string) => {
    searchParams.set("query", value.toLowerCase());
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleNextPageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handlePreviousPageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const totalPages = results
    ? Math.ceil(results.pagination.total / itemsPerPage)
    : 1;
  const currentPage = Number(searchParameters.get("page") || 1);

  const generatePageButtons = () => {
    const pageButtons = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            size="sm"
            onClick={() => handlePageChange(i)}
            variant={i === currentPage ? "solid" : "outline"}
          >
            {i}
          </Button>
        );
      }
    } else {
      pageButtons.push(
        <Button
          key={1}
          size="sm"
          onClick={() => handlePageChange(1)}
          variant={1 === currentPage ? "solid" : "outline"}
        >
          1
        </Button>
      );

      if (currentPage > 4) {
        pageButtons.push(<Text key="start-ellipsis">...</Text>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <Button
            key={i}
            size="sm"
            onClick={() => handlePageChange(i)}
            variant={i === currentPage ? "solid" : "outline"}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 3) {
        pageButtons.push(<Text key="end-ellipsis">...</Text>);
      }

      pageButtons.push(
        <Button
          key={totalPages}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          variant={totalPages === currentPage ? "solid" : "outline"}
        >
          {totalPages}
        </Button>
      );
    }

    return pageButtons;
  };

  return (
    <Flex w="100%" gap="32px" px="5%" py="64px">
      <Skeleton isLoaded={!isLoading}>
        <Flex direction="column" w="250px" gap="16px">
          <Heading size="md">Filter By</Heading>
          <PriceFilter facets={results?.facets || []} />
        </Flex>
      </Skeleton>
      <Flex direction="column" gap="16px">
        <Skeleton isLoaded={!isLoading}>
          <Flex w="100%" justify="space-between">
            <ProductCategories handleButtonClick={handleButtonClick} />
            <SortByDropdown />
          </Flex>
          <Flex
            w="100%"
            maxW="90vw"
            gap="10%"
            justify="flex-start"
            align="space-evenly"
            flexWrap="wrap"
          >
            {results?.products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </Flex>
        </Skeleton>
        <Flex justify="center" align="center" mt="4px" gap="8px">
          <Button
            onClick={() =>
              curentPage && handlePreviousPageChange(curentPage - 1)
            }
            isDisabled={curentPage === 1 || !curentPage}
          >
            Previous
          </Button>
          {generatePageButtons()}
          <Button
            onClick={() =>
              curentPage && handleNextPageChange(curentPage + 1)
            }
            isDisabled={curentPage === totalPages || (!curentPage && totalPages === 1)}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
