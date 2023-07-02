export function createEnum(values) {
  const enumObject = {};
  for (const val of values) {
    enumObject[val.trim().toUpperCase()] = val;
  }
  return Object.freeze(enumObject);
}
export function toSentenceCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}
