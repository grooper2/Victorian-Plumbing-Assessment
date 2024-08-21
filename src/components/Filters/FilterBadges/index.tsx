import { Button, Flex, Text } from "@chakra-ui/react";
import { FilterProps } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";

export default function FilterBadges({ filters, facets }: FilterProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  function removeIdFromUrl(filterName: string, idToRemove: string) {
    const param = searchParams.get(filterName);

    if (param) {
      const ids = param.split(",");

      const filteredIds = ids.filter((id) => id !== idToRemove);

      if (filteredIds.length) {
        searchParams.set(filterName, filteredIds.join(","));
      } else {
        searchParams.delete(filterName);
      }

      const newUrl = `${location.pathname}?${searchParams.toString()}`;

      navigate(newUrl);
    }
  }

  return (
    <Flex gap="16px" align="center" wrap="wrap">
      {Object.keys(filters).map((filter) => {
        const selectedFilters = filters[filter];

        const filterName = facets.find(
          (facet) => facet.identifier === filter
        )?.displayName;

        return (
          <Flex key={filter} direction="column" gap="16px">
            <Text>{filterName}</Text>
            <Flex gap="16px">
              {Array.isArray(selectedFilters) &&
                selectedFilters.map((selectedFilter) => (
                  <Button
                    key={selectedFilter.identifier}
                    _hover={{ bg: "red.500", color: "white" }}
                    padding="8px"
                    borderRadius="4px"
                    fontSize="12px"
                    onClick={() =>
                      removeIdFromUrl(filter, selectedFilter.identifier)
                    }
                  >
                    {selectedFilter.displayValue}
                  </Button>
                ))}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
