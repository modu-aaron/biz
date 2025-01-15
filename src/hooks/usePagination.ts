import { useState } from "react";

const usePagination = (initialLimit = 20) => {
  const [currentPage, setCurrentPage] = useState({ value: 0, name: "1" });
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(initialLimit);

  const handlePageChange = (page: { value: number; name: string }) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalCount,
    limit,
    setLimit,
    handlePageChange,
    setTotalCount,
  };
};

export default usePagination;
