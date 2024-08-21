import { Button, Flex, Text } from "@chakra-ui/react";
import { PageButtonProps } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";

export function PageButtons({ totalPages, currentPage }: PageButtonProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
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
    <Flex justify="center" align="center" mt="4px" gap="8px">
      <Button
        onClick={() => currentPage && handlePreviousPageChange(currentPage - 1)}
        isDisabled={currentPage === 1 || !currentPage}
      >
        Previous
      </Button>
      {generatePageButtons()}
      {/* <PageButtons totalPages={totalPages} currentPage={currentPage} /> */}
      <Button
        onClick={() => currentPage && handleNextPageChange(currentPage + 1)}
        isDisabled={
          currentPage === totalPages || (!currentPage && totalPages === 1)
        }
      >
        Next
      </Button>
    </Flex>
  );
}
