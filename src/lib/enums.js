import { createEnum } from "./helpers";

export const INTERESTS = createEnum(["parkour", "skate", "both"]);
export const GOVERNMENTS = createEnum([
  'Cairo',
  'Giza',
  'Alexandria',
  'Luxor',
  'Aswan',
  'Suez',
  'Ismailia',
  'Port Said',
  'Damietta',
  'Dakahlia',
  'Sharqia',
  'Qalyubia',
  'Gharbia',
  'Kafr El Sheikh',
  'Monufia',
  'Beheira',
  'Minya',
  'Beni Suef',
  'Faiyum',
  'New Valley',
  'Asyut',
  'Red Sea',
  'Sohag',
  'Qena', 
  'Matruh',
  'North Sinai',
  'South Sinai',
  'Helwan',
]);

export const DOMAINS = createEnum([
  "@gmail",
  "@yahoo",
  "@hotmail",
  "@icloud",
  "@outlook",
]);
