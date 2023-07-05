import { PROFILE_IMAGE_URL } from "./env";

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
export const getProfileImageUrl = (image) => PROFILE_IMAGE_URL + image;

export const getLocaleTime = (DateTimeObject) =>
  new Date(DateTimeObject).toLocaleTimeString("en-US");

export const getLocaleDate = (DateTimeObject) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date(DateTimeObject).toLocaleDateString(undefined, options);
};

export const addWhiteSpace = (string) =>
  string.replace(/([a-zA-Z])([A-Z])([a-z])/g, "$1 $2$3"); //CSVFile => CSV File
