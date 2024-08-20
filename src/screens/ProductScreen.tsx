import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { FacetOption, MappedFilters, ResponseData } from "../types";
import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCategories from "../components/ProductsCategories";
import SortByDropdown from "../components/SortBy";
import { PageButtons } from "../components/PageButtons";
import Filters from "../components/Filters";

export default function ProductScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<ResponseData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, FacetOption[]>>({});
  const searchParams = new URLSearchParams(location.search);
  const currentPage = Number(searchParams.get("page")) || 1;

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
    const query = searchParams.get("query");
    const sort = searchParams.get("sort");
    const page = searchParams.get("page") || "1";

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

          if (selectedOptions.length) {
            mapped[facetIdentifier] = selectedOptions as FacetOption[];
          }
          setFilters(mapped);
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

  const totalPages = results
    ? Math.ceil(results.pagination.total / itemsPerPage)
    : 1;

  return (
    <Flex w="100%" gap="32px" px="5%" py="64px">
      <Skeleton isLoaded={!isLoading}>
        <Flex direction="column" w="250px" gap="16px">
          <Heading size="md">Filter By</Heading>
          {/* Had incorect name of component */}
          <Filters filters={filters} facets={results?.facets || []} />
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
        <PageButtons totalPages={totalPages} currentPage={currentPage} />
      </Flex>
    </Flex>
  );
}
