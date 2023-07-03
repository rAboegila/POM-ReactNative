import { createEnum } from "./helpers";

export const INTERESTS = createEnum(["parkour", "skate", "both"]);
export const GOVERNMENTS = createEnum([
  "Cairo",
  "Giza",
  "Alexandria",
  "Aswan",
  "Luxor",
  "Suez",
  "Ismailia",
  "PortSaid",
  "Damietta",
  "Dakahlia",
  "Sharqia",
  "Qalyubia",
  "Gharbia",
  "KafrElSheikh",
  "Monufia",
  "Beheira",
  "Minya",
  "BeniSuef",
  "Faiyum",
  "NewValley",
  "Asyut",
  "RedSea",
  "Sohag",
  "Qena",
  "Matruh",
  "NorthSinai",
  "SouthSinai",
  "Helwan",
]);

export const DOMAINS = createEnum([
  "@gmail",
  "@yahoo",
  "@hotmail",
  "@icloud",
  "@outlook",
]);
