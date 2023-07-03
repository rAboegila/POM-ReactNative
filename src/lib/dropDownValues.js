import { GOVERNMENTS ,INTERESTS} from "./enums";
import { toSentenceCase } from "./helpers";
export const governments= [
    { label: toSentenceCase(GOVERNMENTS.CAIRO), value: GOVERNMENTS.CAIRO },
    { label: toSentenceCase(GOVERNMENTS.GIZA), value: GOVERNMENTS.GIZA },
    {
      label: toSentenceCase(GOVERNMENTS.ALEXANDRIA),
      value: GOVERNMENTS.ALEXANDRIA,
    },
    { label: toSentenceCase(GOVERNMENTS.LUXOR), value: GOVERNMENTS.LUXOR },
    { label: toSentenceCase(GOVERNMENTS.ASWAN), value: GOVERNMENTS.ASWAN },
    { label: toSentenceCase(GOVERNMENTS.SUEZ), value: GOVERNMENTS.SUEZ },
    {
      label: toSentenceCase(GOVERNMENTS.ISMAILIA),
      value: GOVERNMENTS.ISMAILIA,
    },
    {
      label: toSentenceCase(GOVERNMENTS["PORT SAID"]),
      value: GOVERNMENTS["PORT SAID"],
    },
    {
      label: toSentenceCase(GOVERNMENTS.DAMIETTA),
      value: GOVERNMENTS.DAMIETTA,
    },
    {
      label: toSentenceCase(GOVERNMENTS.DAKAHLIA),
      value: GOVERNMENTS.DAKAHLIA,
    },
    { label: toSentenceCase(GOVERNMENTS.SHARQIA), value: GOVERNMENTS.SHARQIA },
    {
      label: toSentenceCase(GOVERNMENTS.QALYUBIA),
      value: GOVERNMENTS.QALYUBIA,
    },
    { label: toSentenceCase(GOVERNMENTS.GHARBIA), value: GOVERNMENTS.GHARBIA },
    {
      label: toSentenceCase(GOVERNMENTS["KAFR EL SHEIKH"]),
      value: GOVERNMENTS["KAFR EL SHEIKH"],
    },
    { label: toSentenceCase(GOVERNMENTS.MONUFIA), value: GOVERNMENTS.MONUFIA },
    { label: toSentenceCase(GOVERNMENTS.BEHEIRA), value: GOVERNMENTS.BEHEIRA },
    { label: toSentenceCase(GOVERNMENTS.MINYA), value: GOVERNMENTS.MINYA },
    {
      label: toSentenceCase(GOVERNMENTS["BENI SUEF"]),
      value: GOVERNMENTS["BENI SUEF"],
    },
    { label: toSentenceCase(GOVERNMENTS.FAIYUM), value: GOVERNMENTS.FAIYUM },
    {
      label: toSentenceCase(GOVERNMENTS["NEW VALLEY"]),
      value: GOVERNMENTS["NEW VALLEY"],
    },
    { label: toSentenceCase(GOVERNMENTS.ASYUT), value: GOVERNMENTS.ASYUT },
    { label: toSentenceCase(GOVERNMENTS["RED SEA"]), value: GOVERNMENTS["RED SEA"] },
    { label: toSentenceCase(GOVERNMENTS.SOHAG), value: GOVERNMENTS.SOHAG },
    { label: toSentenceCase(GOVERNMENTS.QENA), value: GOVERNMENTS.QENA },
    { label: toSentenceCase(GOVERNMENTS.MATRUH), value: GOVERNMENTS.MATRUH },
    {
      label: toSentenceCase(GOVERNMENTS["NORTH SINAI"]),
      value: GOVERNMENTS["NORTH SINAI"],
    },
    {
      label: toSentenceCase(GOVERNMENTS["SOUTH SINAI"]),
      value: GOVERNMENTS["SOUTH SINAI"],
    },
    { label: toSentenceCase(GOVERNMENTS.HELWAN), value: GOVERNMENTS.HELWAN },
  ];


  export const interests= [
    { label: toSentenceCase(INTERESTS.PARKOUR), value: INTERESTS.PARKOUR },
    { label: toSentenceCase(INTERESTS.SKATE), value: INTERESTS.SKATE },
    { label: toSentenceCase(INTERESTS.BOTH), value: INTERESTS.BOTH },
  ];