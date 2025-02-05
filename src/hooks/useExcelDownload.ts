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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

        intervalRef.current = setInterval(async () => {
          if (!intervalRef.current) return;

          const { state, progress, url } = await getExcelStatusFunc({
            ...getExcelStatusFuncParams,
            id,
          });

          if (state === ExcelStatus.COMPLETED) {
            setStatus({
              finished: true,
              onGoing: false,
              error: false,
              percent: progress,
            });
            setExcelUrl(String(url));
            setIsSpinner(false);

            window.open(url as string, "_blank");
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          } else if (state === ExcelStatus.FAILED) {
            setStatus({
              finished: true,
              onGoing: false,
              error: true,
              percent: 0,
            });
            setIsSpinner(false);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          } else {
            setStatus((prev) => ({
              ...prev,
              percent: progress !== 100 ? progress : prev.percent,
            }));
          }
        }, 1500);
      } catch (err) {
        setStatus({ finished: false, onGoing: false, error: true, percent: 0 });
        setIsSpinner(false);
      }
    },
    [setIsSpinner]
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { ...status, excelUrl, excelDownload };
};
