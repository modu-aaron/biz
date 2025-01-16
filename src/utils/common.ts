export const getStatusByCode = <
  T extends { [key: string]: number | string },
  U extends { [key: string]: string }
>(
  code: T[keyof T],
  codeEnum: T,
  statusEnum: U
): string => {
  const statusKey = Object.keys(codeEnum).find((key) => codeEnum[key] === code);

  return statusKey ? statusEnum[statusKey] : "-";
};
