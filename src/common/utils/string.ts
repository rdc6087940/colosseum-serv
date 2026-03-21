export function getJson(arg: any) {
  try {
    return { ...arg };
  } catch (e) {}
  return { error: `${arg.toString()}` };
}

// 숫자를 제외한 문자 제거
export function removeWithoutNumber(s: string) {
  return s.trim().replace(/([^0-9])/g, '');
}

// 알파벳, 숫자를 제외한 문자 제거
export function removeSpecialChars(s: string) {
  return s.trim().replace(/([^a-zA-Z0-9])/g, '');
}

// 특수 문자를 _로 바꿔서 어떤 문자가 들어오더라도 검색되도록
export function parseKeyword(keyword: string) {
  return keyword.trim().replace(/([^a-zA-Z0-9, ])/g, '_');
}
