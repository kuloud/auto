export const formatNumber = (num?: number): string => {
  if (num === undefined) return "0";
  if (num >= 10000) {
    const wan = (num / 10000).toFixed(1).replace(".0", "");
    return `${wan}万`;
  }
  return num?.toLocaleString() ?? "0";
};
