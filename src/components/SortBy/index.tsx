import React from "react";
import Select from "react-select";
import { SORTING_VALUES } from "../../util/const";
import { useLocation, useNavigate } from "react-router-dom";

export default function SortByDropdown() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const handleOnChange = (value: number) => {
    searchParams.set("sort", String(value));
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <Select
      options={SORTING_VALUES}
      onChange={(option) => handleOnChange(option?.value ?? 1)}
    />
  );
}
