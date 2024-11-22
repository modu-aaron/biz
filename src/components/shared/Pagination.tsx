import React, { useState, useEffect, useMemo } from "react";

interface ValueName<T> {
  value: T;
  name: string;
  active?: boolean;
}

interface PaginationProps {
  currPage: ValueName<number>;
  totalCount: number;
  limit: number;
  onPageChange: (page: ValueName<number>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currPage,
  totalCount,
  limit,
  onPageChange,
}) => {
  // 전체 페이지 수 계산
  const totalPages = useMemo(
    () => Math.ceil(totalCount / limit),
    [totalCount, limit]
  );

  // 페이지 목록 생성
  const generatePages = () => {
    return Array.from({ length: totalPages }, (_, index) => ({
      value: index * limit,
      name: String(index + 1),
      active: currPage.value === index * limit,
    }));
  };

  const [pages, setPages] = useState<ValueName<number>[]>(generatePages());

  useEffect(() => {
    setPages(generatePages());
  }, [currPage, totalPages]);

  // 이전/다음 버튼 상태
  const isPrevPageDisabled = currPage.value < limit;
  const isNextPageDisabled = currPage.value + limit >= totalPages * limit;

  // 페이지 변경 핸들러
  const handlePrevPage = () => {
    if (!isPrevPageDisabled) {
      onPageChange({
        value: currPage.value - limit,
        name: String((currPage.value - limit) / limit + 1),
      });
    }
  };

  const handleNextPage = () => {
    if (!isNextPageDisabled) {
      onPageChange({
        value: currPage.value + limit,
        name: String((currPage.value + limit) / limit + 1),
      });
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={isPrevPageDisabled}
          onClick={handlePrevPage}
          className="disabled:bg-gray-50 disabled:text-gray-300 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          이전
        </button>
        <button
          disabled={isNextPageDisabled}
          onClick={handleNextPage}
          className="disabled:bg-gray-50 disabled:text-gray-300 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          다음
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            보기
            <span className="font-medium"> {currPage.name} </span>
            부터
            <span className="font-medium"> {totalPages} </span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrevPage}
              disabled={isPrevPageDisabled}
              className="disabled:bg-gray-50 disabled:text-gray-300 relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {pages.map((page) => (
              <button
                key={page.value}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20 ${
                  page.active
                    ? "z-10 bg-[#0078ff] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0078ff]"
                    : "text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                }`}
              >
                {page.name}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={isNextPageDisabled}
              className="disabled:bg-gray-50 disabled:text-gray-300 relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
