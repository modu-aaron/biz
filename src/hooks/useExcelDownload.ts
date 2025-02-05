import { useState, useEffect, useRef, useCallback } from "react";
import { ExcelStatus } from "@/enums";
import excelService from "@/services/api/excel";
import { useSpinner } from "@/store/useSpinner";

export type ExcelDownloadStatusResponse = {
  state: ExcelStatus;
  progress: number;
  url: string | null;
};

export const useExcelDownload = () => {
  const [excelUrl, setExcelUrl] = useState("");
  const [status, setStatus] = useState({
    finished: false,
    onGoing: false,
    error: false,
    percent: 0,
  });
  const { setIsSpinner } = useSpinner();
  //인터벌을 저장하는 ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  //인터벌 제거 함수
  const clearRequest = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  //Excel 상태를 주기적으로 확인하는 함수
  const checkingExcelStatus = useCallback(
    async (
      id: string,
      getExcelStatusFunc: (params: {
        id: string;
        accessToken?: string;
      }) => Promise<ExcelDownloadStatusResponse>,
      getExcelStatusFuncParams: { accessToken?: string }
    ) => {
      intervalRef.current = setInterval(async () => {
        try {
          const { state, progress, url } = await getExcelStatusFunc({
            ...getExcelStatusFuncParams,
            id,
          });

          if (state === ExcelStatus.COMPLETED) {
            setStatus({
              finished: true,
              onGoing: false,
              error: false,
              percent: 100,
            });
            setExcelUrl(url || "");
            setIsSpinner(false);
            clearRequest();
            if (url) window.open(url, "_blank");
          } else if (state === ExcelStatus.FAILED) {
            setStatus({
              finished: true,
              onGoing: false,
              error: true,
              percent: 0,
            });
            setIsSpinner(false);
            clearRequest();
          } else {
            setStatus((prev) => ({ ...prev, percent: progress }));
          }
        } catch (error) {
          console.error("Error while polling excel status:", error);
          setStatus({
            finished: false,
            onGoing: false,
            error: true,
            percent: 0,
          });
          setIsSpinner(false);
          clearRequest();
        }
      }, 1500);
    },
    [clearRequest, setIsSpinner]
  );

  //Excel 다운로드 요청 함수
  const excelDownload = useCallback(
    async (
      getExcelFunc: () => Promise<{ id: string }>,
      getExcelStatusFunc: (params: {
        id: string;
        accessToken?: string;
      }) => Promise<ExcelDownloadStatusResponse> = excelService.getExcelStatus,
      getExcelStatusFuncParams: { accessToken?: string } = {}
    ) => {
      try {
        setIsSpinner(true);
        setStatus({ finished: false, onGoing: true, error: false, percent: 0 });
        setExcelUrl("");

        const { id } = await getExcelFunc();
        checkingExcelStatus(id, getExcelStatusFunc, getExcelStatusFuncParams);
      } catch (err) {
        setStatus({ finished: false, onGoing: false, error: true, percent: 0 });
        setIsSpinner(false);
      }
    },
    [setIsSpinner, checkingExcelStatus]
  );

  //인터벌 제거
  useEffect(() => clearRequest, [clearRequest]);

  return { ...status, excelUrl, excelDownload };
};
