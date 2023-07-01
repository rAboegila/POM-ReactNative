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
  "Port_Said",
  "Damietta",
  "Dakahlia",
  "Sharqia",
  "Qalyubia",
  "Gharbia",
  "Kafr_ElSheikh",
  "Monufia",
  "Beheira",
  "Minya",
  "Beni_Suef",
  "Faiyum",
  "New_Valley",
  "Asyut",
  "Red_Sea",
  "Sohag",
  "Qena",
  "Matruh",
  "North_Sinai",
  "South_Sinai",
  "Helwan",
]);

export const DOMAINS = createEnum([
  "@gmail",
  "@yahoo",
  "@hotmail",
  "@icloud",
  "@outlook",
]);
