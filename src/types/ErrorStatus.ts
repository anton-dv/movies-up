export enum ErrorStatus {
  NONE = "NONE",
  NO_INTERNET = "NO_INTERNET",
  EMPTY = "EMPTY",
}

export const isErrorStatus = (status: ErrorStatus) => {
  return Object.values(ErrorStatus).includes(status);
};
