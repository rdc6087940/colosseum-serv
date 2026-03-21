export function parseToCommaPrice(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
