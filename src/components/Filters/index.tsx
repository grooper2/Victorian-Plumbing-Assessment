import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Facet, FacetOption, FilterProps } from "../../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBadges from "./FilterBadges";

export default function Filters({ facets, filters }: FilterProps) {
  const [selectedFacets, setSelectedFacets] = useState<
    Record<string, string[]>
  >({});

  const navigate = useNavigate();

  const handleCheckboxChange = (
    facetIdentifier: string,
    optionIdentifier: string,
    isChecked: boolean
  ) => {
    setSelectedFacets((prev) => {
      const currentOptions = prev[facetIdentifier] || [];

      const updatedOptions = isChecked
        ? [...currentOptions, optionIdentifier]
        : currentOptions.filter((id) => id !== optionIdentifier);

      return {
        ...prev,
        [facetIdentifier]: updatedOptions,
      };
    });

    applySearchParams(facetIdentifier, optionIdentifier, isChecked);
  };

  const applySearchParams = (
    facetIdentifier: string,
    optionIdentifier: string,
    isChecked: boolean
  ) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (isChecked) {
      const currentValues = searchParams.get(facetIdentifier)?.split(",") || [];
      currentValues.push(optionIdentifier);
      searchParams.set(facetIdentifier, currentValues.join(","));
    } else {
      const currentValues = searchParams.get(facetIdentifier)?.split(",") || [];
      const updatedValues = currentValues.filter(
        (id) => id !== optionIdentifier
      );
      if (updatedValues.length > 0) {
        searchParams.set(facetIdentifier, updatedValues.join(","));
      } else {
        searchParams.delete(facetIdentifier);
      }
    }
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <Flex direction="column" gap="24px">
      {/* Filter badges for selected filters */}
      <FilterBadges facets={facets} filters={filters} />
      <Accordion
        border="1px solid"
        borderRadius="8px"
        defaultIndex={[0]}
        allowMultiple
      >
        {facets.map((facet) => (
          <AccordionItem key={facet.identifier} border="none">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {/* Correct name for filters */}
                <Heading size="sm">{facet.displayName} Filter</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CheckboxGroup>
                <Flex direction="column" gap="8px">
                  {facet.options.map((option) => {
                    const isChecked =
                      selectedFacets[facet.identifier]?.includes(
                        option.identifier
                      ) || false;

                    return (
                      <Checkbox
                        key={option.identifier}
                        isChecked={isChecked}
                        onChange={(e) =>
                          handleCheckboxChange(
                            facet.identifier,
                            option.identifier,
                            e.target.checked
                          )
                        }
                      >
                        {`${option.displayValue} (${option.productCount})`}
                      </Checkbox>
                    );
                  })}
                </Flex>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
}
