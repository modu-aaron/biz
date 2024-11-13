import { useForm } from "react-hook-form";
import BaseTitle from "../../components/shared/BaseTitle";
import MainWrapper from "../../components/shared/MainWrapper";
import SelectBox from "../../components/shared/SelectBox";
import { useWatch } from "react-hook-form";

const Ticket = () => {
  const { control, register } = useForm();

  const selectedSearchKey = useWatch({ control, name: "selectedSearchKey" });
  const searchWord = useWatch({ control, name: "searchWord" });

  return (
    <MainWrapper>
      <BaseTitle text="이용현황" />
      <div className="flex flex-col gap-10">
        <div className="w-full border border-neutral-200/50 rounded px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:gap-10">
              <p className="text-sm whitespace-nowrap">검색어</p>
              <div className="flex gap-2 w-full">
                <SelectBox
                  name="selectedSearchKey"
                  label={null}
                  control={control}
                  options={[
                    { value: null, label: "선택" },
                    { value: "carNum", label: "차량번호" },
                    { value: "ptSeq", label: "주차권번호" },
                    { value: "userPhone", label: "사용자 연락처" },
                  ]}
                />
                <input
                  type="text"
                  {...register("searchWord")}
                  disabled={!selectedSearchKey}
                  placeholder="검색어를 입력해주세요."
                  className="pl-2 py-2 w-full sm:max-w-64 text-sm rounded-sm border border-neutral-300/50"
                />
              </div>
            </div>
            <hr className="border-neutral-200/40 " />
            <p className="text-sm">상세조건</p>
            <SelectBox
              name="selectedSearchKey"
              label={"이용상태"}
              control={control}
              options={[
                { value: null, label: "전체" },
                { value: 200, label: "사용중" },
              ]}
            />{" "}
            <SelectBox
              name="selectedSearchKey"
              label={"잔여일"}
              control={control}
              options={[
                { value: null, label: "전체" },
                { value: 1, label: "1일 (오늘 종료)" },
                { value: 3, label: "3일 이내" },
                { value: 7, label: "7일 이내" },
                { value: 14, label: "14일 이내" },
              ]}
            />
            <button className="flex w-12 justify-center text-sm border rounded-sm bg-[#0099ff] py-2 text-white">
              검색
            </button>
          </div>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-900"
                  >
                    지원부서
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-900"
                  >
                    근무형태
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-900"
                  >
                    직종
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 opacity-25">
                  <td className="px-4 py-4 text-sm font-medium text-indigo-600">
                    Back End Developer
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      테스트1
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z"></path>
                      </svg>
                      테스트2
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      재택
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                이전
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                다음
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  보기
                  <span className="font-medium">1</span>
                  부터
                  <span className="font-medium">10</span>의
                  <span className="font-medium">97</span>
                  결과
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
                  </a>
                  {/* <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" --> */}
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                  </span>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    9
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default Ticket;
