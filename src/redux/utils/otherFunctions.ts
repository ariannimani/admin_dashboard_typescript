export function numberWithCommas(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatCash = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(3) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(3) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(3) + "T";
};
