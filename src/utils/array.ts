export const getArray = (length: number) => {
  const result: number[] = [];
  result.length = length;
  return result.fill(0);
};
