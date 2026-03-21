// ex) birth = 1990.05.25
export function getAgeFromBirth(birth: string) {
  if (birth === undefined) return;

  const nowYear = new Date().getFullYear();
  const birthYear = Number(birth.substring(0, 4));

  return nowYear - birthYear;
}
