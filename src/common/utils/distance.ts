/**
 * 위도 -> 미터
 * @param lat
 * @returns
 */
export function convertLatToMeters(lat: number) {
  return lat * 111.32 * 1000;
}
