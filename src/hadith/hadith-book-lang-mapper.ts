import { HadithLangEnum } from '../types/hadith-lang.enum';
import { HadithBook } from '../types/hadith.enum';

export const hadithBookLanguages: Record<HadithBook, HadithLangEnum[]> = {
  [HadithBook.AbuDawud]: [
    HadithLangEnum.Arabic,
    HadithLangEnum.Bengali,
    HadithLangEnum.English,
    HadithLangEnum.Indonesian,
    HadithLangEnum.Russian,
    HadithLangEnum.Turkish,
    HadithLangEnum.Urdu,
  ],
  [HadithBook.Bukhari]: [
    HadithLangEnum.Arabic,
    HadithLangEnum.Bengali,
    HadithLangEnum.English,
    HadithLangEnum.Indonesian,
    HadithLangEnum.Russian,
    HadithLangEnum.Tamil,
    HadithLangEnum.Turkish,
    HadithLangEnum.Urdu,
  ],
  [HadithBook.Dehlawi]: [HadithLangEnum.Arabic, HadithLangEnum.English],
  [HadithBook.IbnMajah]: [
    HadithLangEnum.Arabic,
    HadithLangEnum.Bengali,
    HadithLangEnum.English,
    HadithLangEnum.Indonesian,
    HadithLangEnum.Turkish,
    HadithLangEnum.Urdu,
  ],
  [HadithBook.MuwattaMalik]: [
    HadithLangEnum.Arabic,
    HadithLangEnum.English,
    HadithLangEnum.Turkish,
    HadithLangEnum.Urdu,
  ],
  [HadithBook.Muslim]: [
    HadithLangEnum.Arabic,
    HadithLangEnum.Bengali,
    HadithLangEnum.English,
    HadithLangEnum.Indonesian,
    HadithLangEnum.Russian,
    HadithLangEnum.Tamil,
    HadithLangEnum.Turkish,
    HadithLangEnum.Urdu,
  ],
  [HadithBook.Nasai]: [
    HadithLangEnum.Arabic,
    HadithLangEnum.Bengali,
    HadithLangEnum.English,
    HadithLangEnum.Indonesian,
    HadithLangEnum.Russian,
    HadithLangEnum.Tamil,
    HadithLangEnum.Turkish,
    HadithLangEnum.Urdu,
  ],
  [HadithBook.Tirmidhi]: [
    HadithLangEnum.Arabic,
    HadithLangEnum.Bengali,
    HadithLangEnum.English,
    HadithLangEnum.Indonesian,
    HadithLangEnum.Russian,
    HadithLangEnum.Turkish,
    HadithLangEnum.Urdu,
  ],
  [HadithBook.Nawawi40]: [HadithLangEnum.Arabic, HadithLangEnum.Bengali, HadithLangEnum.English],
  [HadithBook.Qudsi]: [HadithLangEnum.Arabic, HadithLangEnum.English],
};