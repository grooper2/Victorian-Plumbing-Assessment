import { BodyProps } from "../types";

export const getProducts = ({
  pageNumber = 0,
  query = "toilets",
  size = 20,
  additionalPages = 0,
  sort = 0,
  facets,
}: BodyProps) => {
  
  const payload = {
    query: query,
    pageNumber: pageNumber,
    size: size,
    additionalPages: additionalPages,
    sort: sort,
    facets,
  };

  return fetch(
    `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u
3A83H8IBvI`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data)
    .catch((err) => err.message);
};
