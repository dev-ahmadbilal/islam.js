import { TranslationEnum } from '../../types/translation.enum';
import { QuranBengali } from './QuranBengali';
import { QuranChinese } from './QuranChinese';

import { QuranFrench } from './QuranFrench';
import { QuranGerman } from './QuranGerman';
import { QuranHindi } from './QuranHindi';
import { QuranJapanese } from './QuranJapanese';
import { QuranKorean } from './QuranKorean';
import { QuranNorwegian } from './QuranNorwegian';
import { QuranPashto } from './QuranPashto';
import { QuranPersian } from './QuranPersian';
import { QuranPunjabi } from './QuranPunjabi';
import { QuranRussian } from './QuranRussian';
import { QuranSindhi } from './QuranSindhi';
import { QuranSpanish } from './QuranSpanish';
import { QuranTamil } from './QuranTamil';
import { QuranThai } from './QuranThai';
import { QuranTurkish } from './QuranTurkish';
import { QuranUrdu } from './QuranUrdu';
import { QuranEnglish } from './QuranEnglish';
import { QuranAlbanian } from './QuranAlbani';
import { QuranBulgarian } from './QuranBalgarian';
import { QuranDutch } from './QuranDutch';
import { QuranIndonesian } from './QuranIndonesian';
import { QuranItalian } from './QuranItalian';
import { QuranPortuguese } from './QuranPortuguese';
import { QuranRomanian } from './QuranRomanian';
import { QuranSomali } from './QuranSomali';
import { QuranUzbek } from './QuranUzbek';

const translations: Record<TranslationEnum, string[][]> = {
  al: QuranAlbanian,
  bg: QuranBulgarian,
  bn: QuranBengali,
  zh: QuranChinese,
  nl: QuranDutch,
  en: QuranEnglish,
  fr: QuranFrench,
  de: QuranGerman,
  hi: QuranHindi,
  id: QuranIndonesian,
  it: QuranItalian,
  ja: QuranJapanese,
  ko: QuranKorean,
  no: QuranNorwegian,
  ps: QuranPashto,
  fa: QuranPersian,
  pt: QuranPortuguese,
  ro: QuranRomanian,
  so: QuranSomali,
  pa: QuranPunjabi,
  ru: QuranRussian,
  sd: QuranSindhi,
  es: QuranSpanish,
  ta: QuranTamil,
  th: QuranThai,
  tr: QuranTurkish,
  ur: QuranUrdu,
  uz: QuranUzbek,
};

export default function getTranslation(lang: TranslationEnum) {
  return translations[lang];
}
