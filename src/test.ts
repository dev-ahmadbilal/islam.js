/* eslint-disable @typescript-eslint/no-unused-vars */
// src/index.ts
import { Quran, Tafseer, Translation } from './quran';
import { DialectEnum } from './types/dialect.enum';
import { TafseerEnum } from './types/tafseer.enum';
import { TranslationEnum } from './types/translation.enum';
import { Hadith } from './hadith/hadith'; // Adjust the import path based on your project structure
import { HadithBook } from './types/hadith.enum'; // Adjust the import path based on your project structure
import { HadithLangEnum } from './types/hadith-lang.enum'; // Adjust the import path based on your project structure
import { Prayer } from './prayer/prayer';
import { HijriCalendar } from './calander/hijri-calander'; // Adjust the import path based on your project structure
import { Azkar } from './azkar/azkar';
import { AzkarCategoriesEnum } from './types/azkar-categories.enum';
const quran = new Quran(DialectEnum.Hafs);
const translation = new Translation();

// // Test the getSurah method
// const surah = quran.getVerseRange(1, 2, 4);
// const surah1 = quran.getVerseRangeWithTranslation(1, 2, 4);
// const surah2 = quran.getMultipleVersesWithTranslation([
//   { chapterNo: 1, verseNo: 4 },
//   { chapterNo: 2, verseNo: 2 },
// ]);
// const surah3 = quran.getMultipleVersesWithTranslation([
//   { chapterNo: 1, verseNo: 4 },
//   { chapterNo: 2, verseNo: 2 },
// ]);

// console.log(surah); // Should output: Surah 1
// const t = translation.getVerseRangeTranslation(1, 2, 4);
// const t1 = translation.getVerseTranslationByKey('1:2');
// // Test the getAyah method
// const ayah = quran.getRandomVerse();
// const ayah1 = quran.getRandomVerseWithTranslation();
// console.log(ayah); // Should output: Ayah 1 from Surah 1

// const tafseer = new Tafseer();

// Fetch all Quran chapters
// tafseer.get().then((data) => console.log(data));

// Fetch tafseer for a specific Ayah
// tafseer.getChapterTafseer(111, TafseerEnum.TafsirIbnKaseerUrdu).then((ayahTafseer) => {
//   console.log(ayahTafseer);
// });

// quran.getVerseWithTranslationAndTafseer(114, 2, TranslationEnum.English, TafseerEnum.AlJalalayn).then((ayahTafseer) => {
//   console.log(ayahTafseer);
// });

// const hadith = new Hadith();

// // Fetch all available editions
// hadith
//   .getAllEditions()
//   .then((allEditions) => {
//     console.log('All Editions:', allEditions);
//   })
//   .catch((error) => {
//     console.error('Error fetching all editions:', error);
//   });

// // Fetch a specific edition's full content
// hadith
//   .getEdition(HadithBook.Bukhari, HadithLangEnum.English)
//   .then((editionContent) => {
//     console.log('Edition Content for Sahih Bukhari in English:', editionContent);
//   })
//   .catch((error) => {
//     console.error('Error fetching edition content:', error);
//   });

// // Fetch a specific Hadith by number
// hadith
//   .getHadith(HadithBook.Muslim, 5, HadithLangEnum.English)
//   .then((hadithContent) => {
//     console.log('Hadith Content for Hadith number 5 in Sahih Muslim (English):', hadithContent);
//   })
//   .catch((error) => {
//     console.error('Error fetching Hadith content:', error);
//   });

// // Fetch a specific section by number
// hadith
//   .getSection(HadithBook.Bukhari, 5, HadithLangEnum.English)
//   .then((sectionContent) => {
//     console.log('Section Content for section number 5 in Sahih Bukhari (English):', sectionContent);
//   })
//   .catch((error) => {
//     console.error('Error fetching section content:', error);
//   });

// // Fetch information about Hadith books
// hadith
//   .getInfo()
//   .then((info) => {
//     console.log('Hadith Books Info:', info);
//   })
//   .catch((error) => {
//     console.error('Error fetching Hadith books info:', error);
//   });

// const prayer = new Prayer();
// const date = '17-07-2007'; // Example date
// const latitude = 51.508515;
// const longitude = -0.1254872;
// const method = 2; // Optional: Calculation method

// prayer
//   .getPrayerTimesByLocation(date, latitude, longitude, method)
//   .then((prayerData) => {
//     console.log('Prayer Times Data:', prayerData);
//   })
//   .catch((error) => {
//     console.error('Error fetching prayer times:', error);
//   });

// const city = 'Dubai';
// const country = 'United Arab Emirates';

// prayer
//   .getPrayerTimesByCity(city, country)
//   .then((prayerData) => {
//     console.log('Prayer Times Data by City:', prayerData);
//   })
//   .catch((error) => {
//     console.error('Error fetching prayer times by city:', error);
//   });

// const hijriCalendar = new HijriCalendar();

// // Fetch Hijri date by location
// hijriCalendar.getHijriDateByLocation('17-07-2007', latitude, longitude, method).then((hijriDate: any) => {
//     console.log('Hijri Date by Location:', hijriDate);
// }).catch((error: any) => {
//     console.error('Error fetching Hijri date by location:', error);
// });

// // Fetch Hijri date by city
// hijriCalendar.getHijriDateByCity(city, country, method).then((hijriDate: any) => {
//     console.log('Hijri Date by City:', hijriDate);
// }).catch((error: any) => {
//     console.error('Error fetching Hijri date by city:', error);
// });

// const azkar = new Azkar();
// //134 categories and 360+ Azkars
// // Example usage:
// const randomMorningAzkar = azkar.getRandomByCategory(AzkarCategoriesEnum.Anxiety);
// const allAzkars = azkar.getAll();
// const category = azkar.getByCategory(AzkarCategoriesEnum.Morning);
// const randomAzkar = azkar.getRandom();
// console.log(randomAzkar);
