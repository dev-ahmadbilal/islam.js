# islam.js
[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

`islam.js` is a comprehensive JavaScript/TypeScript library designed for Islamic applications. It provides functionalities related to the Quran, Hadith, Dua & Azkar, Prayer Timings, and Hijri Calendar. This package offers multilingual support, a wide range of Tafseers, Hadith collections, and tools to enhance the development of Islamic software solutions.

## Features

- [**Quran:**](#1-quran)
  - Support for Dialects: Hafs and Warsh
  - 20 Language Translations
  - 28 Tafseers (Commentaries) in different languages

- [**Hadith:**](#2-hadith)
  - Collections: Kutub al-Sittah (Six Authentic Books) with 5+ Translations

- [**Dua & Azkar:**](#3-dua--azkar)
  - 134 categories with over 360 Azkars (supplications)

- [**Prayer Timings:**](#4-prayer-timings)
  - Accurate prayer timings for any location worldwide

- [**Hijri Calendar:**](#5-hijri-calander)
  - Hijri date conversion and calendar utilities

## Installation

To install `islam.js`, use npm or yarn:

```bash
npm install islam.js
# or
yarn add islam.js
```

## Getting Started
Import the library into your JavaScript or TypeScript project and start using the available features.
```ts
import { Quran, Hadith } from 'islam.js';
```

## Usage

### 1. Quran
#### Get a chapter by index
```ts
import { Quran } from 'islam.js';
const quran = new Quran();
const chapter = quran.getChapterByIndex(108);
console.log(chapter);

//Output
{
   "name": "الكوثر",
   "type": "مكيّة",
   "englishName": "Al-Kawthar",
   "number": 108,
   "numberOfLetters": 42,
   "numberOfVerses": 3,
   "numberOfWords": 10,
   "verses": [
      "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
      "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
      "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ"
   ]
}

```

#### Get a chapter by name
By default the dialect will be `Hafs` but we can change it to `Warsh` as well. 
```ts
import { Quran, DialectEnum } from 'islam.js';
const quran = new Quran(DialectEnum.Warsh);
const chapter = quran.getChapterByName('Al-Ekhlas');
console.log(chapter);

//Output
{
   "name": "الإخلاص",
   "type": "مكيّة",
   "englishName": "Al-Ekhlas",
   "number": 112,
   "numberOfLetters": 47,
   "numberOfVerses": 4,
   "numberOfWords": 15,
    "verses": [
      "قُلْ هُوَ اللَّهُ أَحَدٌ",
      "اللَّهُ الصَّمَدُ",
      "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"
   ]
}

```

#### Get a verse by chapterNo and verseNo
```ts
import { Quran } from 'islam.js';
const quran = new Quran();
const verse = quran.getVerse(21, 107);
console.log(verse);

//Output
'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ'
```

#### Get multiple verses with translation
```ts
import { Quran } from 'islam.js';
const quran = new Quran();
const verse =  quran.getMultipleVersesWithTranslation([{ chapterNo: 21, verseNo: 107 }]);
console.log(verse);

//Output
[
   {
      "verse": "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
      "translation": "And We have not sent you, [O Muhammad], except as a mercy to the worlds."
   }
]
```
We can specify a different language for translation as well.
```ts
import { Quran, TranslationEnum } from 'islam.js';
const quran = new Quran();
const verse =  quran.getMultipleVersesWithTranslation([{ chapterNo: 21, verseNo: 107 }], TranslationEnum.French);
console.log(verse);

//Output
[
   {
      "verse": "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
      "translation": "Et Nous ne t'avons envoyé qu'en miséricorde pour l'univers."
   }
]
```

#### Get random verse with translation
```ts
import { Quran } from 'islam.js';
const quran = new Quran();
const verse =  quran.getRandomVerseWithTranslation();
console.log(verse);

//Output
{
   "chapter": "الزمر",
   "verseNo": 53,
   "verse": "۞ قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ",
   "translation": "Say, 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah.Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'"
}
```

#### Get a verse with translation and tafseer
```ts
import { Quran, TranslationEnum, TafseerEnum } from 'islam.js';
const quran = new Quran();
const verse = await quran.getVerseWithTranslationAndTafseer(53, 39, TranslationEnum.Urdu, TafseerEnum.TafsirBayanulQuran)
console.log(verse);

//Output
{
   "verse": "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ",
   "translation": "اور یہ کہ انسان کو وہی ملتا ہے جس کی وہ کوشش کرتا ہے",
   "tafseer": "آیت 39{ وَاَنْ لَّــیْسَ لِلْاِنْسَانِ اِلَّا مَا سَعٰی۔ } ”اور یہ کہ انسان کے لیے نہیں ہے مگر وہی کچھ جس کی اس نے سعی کی ہوگی۔“ انسان کو جو کچھ کرنا ہوگا اپنی محنت اور کوشش کے بل پر کرنا ہوگا ‘ خواہشوں اور تمنائوں سے کچھ نہیں ہوگا۔ قبل ازیں آیت 24 میں سوال کیا گیا تھا کہ ”کیا انسان کو وہی کچھ مل جائے گا جس کی وہ تمنا کرے گا ؟“ یہ آیت گویا مذکورہ سوال کا جواب ہے۔"
}
```

### 2. Hadith

#### Get a hadith by book and hadithNo
```ts
import { Hadith, HadithBook } from 'islam.js';
const hadith = new Hadith();
const engHadith =  await hadith.getHadith(HadithBook.AbuDawud, 7)
console.log(engHadith);

//Output
{
   "metadata": {
      "name": "Sunan Abu Dawud",
      "section": "Purification (Kitab Al-Taharah)",
      "sectionDetails": {
        "arabicNumberFirst": 1,
        "arabicNumberLast": 390,
        "hadithNumberFirst": 1,
        "hadithNumberLast": 390
       }
   },
   "hadith": {

        "text": "Narrated Salman al-Farsi: It was said to Salman: Your Prophet teaches you everything, even about excrement. He replied: Yes. He has forbidden us to face the qiblah at the time of easing or urinating, and cleansing with right hand, and cleansing with less than three stones, or cleansing with dung or bone",
        "hadithNumber": 7,
        "arabicNumber": 7,
        "grades": [
            {
                "name": "Al-Albani",
                "grade": "Sahih"
            },
            {
                "name": "Muhammad Muhyi Al-Din Abdul Hamid",
                "grade": "Sahih"
            },
            {
                "name": "Shuaib Al Arnaut",
                "grade": "Sahih"
            },
            {
                "name": "Zubair Ali Zai",
                "grade": "Sahih Muslim (262)"
            }
        ]
   }
}
```

#### Get a complete section from a book by sectionNo
By default the language will be English but We can specify a different language as well.
```ts
import { Hadith, HadithBook, HadithLangEnum } from 'islam.js';
const hadith = new Hadith();
const section =  await hadith.getSection(HadithBook.Bukhari, 6, HadithLangEnum.Russian);
console.log(section);

//Output
{
   "metadata": {
      "name":"Sahih al Bukhari",
      "section":"Menstrual Periods",
      "sectionDetails":{
            "arabicNumberFirst":294,
            "arabicNumberLast":333,
            "hadithNumberFirst":294,
            "hadithNumberLast":333
       }
   },
   "hadiths":[
        {
            "arabicNumber": 294,
            "grades": [],
            "hadithNumber": 294,
            "reference": { "book": 6, "hadith": 1 },
            "text": "Сообщается, что ‘Аиша, да будет доволен ею Аллах, сказала: «Мы покинули (Медину) с единственной целью совершить хаджж, а в Сарифе, у меня начались месячные. Зайдя ко мне, Посланник Аллаха ﷺ (увидел, что) я плачу, и спросил: “Что с тобой? У тебя начались месячные?” Я ответила: “Да”. Тогда он сказал: “Поистине, это предопределено Аллахом дочерям Адама. Совершай же всё, что совершает паломник, но только не обходи Дом (Каабу)!”»\\n(‘Аиша) сказала: «И Посланник Аллаха ﷺ принёс в жертву коров за своих жён»"
        },
        ...
        ...
        ...
   ]
}
```

### 3. Dua & Azkar
#### Get a random supplication
```ts
import { Azkar } from 'islam.js';
const azkar = new Azkar();
const supplication = azkar.getRandom();
console.log(supplication);

//Output
{
   "id":2669,
   "description":{
      
   },
   "count":"",
   "zikr":"((يُصَلِّي عَلَى النَّبِيِّ صلى الله عليه وسلم بَعْدَ فَرَاغِهِ مِنْ إِجَابَةِ الْمُؤَذِّنِ)).",
   "reference":"",
   "category":"أذكار الآذان"
}

```
#### Get a random supplication by category
```ts
import { Azkar } from 'islam.js';
const azkar = new Azkar();
const supplication = azkar.getRandomByCategory(AzkarCategoriesEnum.Anxiety);
console.log(supplication);

//Output
{
   "id":809,
   "description":{},
   "count":"",
   "zikr":"((اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ)).",
   "reference":"",
   "category":"دعاء الهم والحزن"
}
```
#### Get all supplications by category
```ts
import { Azkar } from 'islam.js';
const azkar = new Azkar();
const supplication = azkar.getByCategory(AzkarCategoriesEnum.Morning);
console.log(supplication);

//Output
[
   {
      "id":2338,
      "description":{},
      "count":"3",
      "zikr":"سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه.",
      "reference":"مسلم",
      "category":"أذكار الصباح"
   },
   ...
   ...
   ...
]
```
#### Get all supplications
```ts
import { Azkar } from 'islam.js';
const azkar = new Azkar();
const supplication = azkar.getAll();
console.log(supplication);

//Output
[
    {
    "category":"أذكار الصباح",
    "count":"1",
    "description":{},
    "id":2374,
    "reference":"أحمد",
    "zikr":"أَصْبَـحْـنا عَلَى فِطْرَةِ الإسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ المُشْرِكِينَ."
    },
    ...
    ...
    ...
]
```
### 4. Prayer Timings
#### Get prayer timing by location
```ts
import { Prayer } from 'islam.js';
const prayer = new Prayer();
const date = '30-08-2024';
const latitude = 31.52037;
const longitude = 74.358749;

const prayerTimings = prayer.getPrayerTimesByLocation(date, latitude, longitude);
console.log(prayerTimings);

//Output
{
  Fajr: "04:13",
  Sunrise: "05:37",
  Dhuhr: "12:03",
  Asr: "15:40",
  Sunset: "18:29",
  Maghrib: "18:29",
  Isha: "19:53",
  Imsak: "04:03",
  Midnight: "00:03",
  Firstthird: "22:11",
  Lastthird: "01:54",
}
```

#### Get prayer timing by city
```ts
import { Prayer } from 'islam.js';
const prayer = new Prayer();
const city = 'Dubai';
const country = 'United Arab Emirates';
const prayerTimings = prayer.getPrayerTimesByCity(city, country)
console.log(prayerTimings);

//Output
{
  Fajr: "04:40",
  Sunrise: "05:59",
  Dhuhr: "12:22",
  Asr: "15:49",
  Sunset: "18:42",
  Maghrib: "18:42",
  Isha: "19:59",
  Imsak: "04:30",
  Midnight: "00:19",
  Firstthird: "22:26",
  Lastthird: "02:12",
}
```
### 5. Hijri Calander

#### Get hijri calander date by location
```ts
import { HijriCalendar } from 'islam.js';
const calendar = new HijriCalendar();
const date = '30-08-2024';
const latitude = 31.52037;
const longitude = 74.358749;
const hijriDate = calander.getHijriDateByLocation(date, latitude, longitude)
console.log(hijriDate);

//Output
{
   "date":"24-02-1446",
   "format":"DD-MM-YYYY",
   "day":"24",
   "weekday":{
      "en":"Al Juma'a",
      "ar":"الجمعة"
   },
   "month":{
      "number":2,
      "en":"Ṣafar",
      "ar":"صَفَر"
   },
   "year":"1446",
   "designation":{
      "abbreviated":"AH",
      "expanded":"Anno Hegirae"
   },
   "holidays":[]
}
```
#### Get hijri calander date by city
```ts
import { HijriCalendar } from 'islam.js';
const calendar = new HijriCalendar();
const city = 'Dubai';
const country = 'United Arab Emirates';
const hijriDate = calander.getHijriDateByCity(city, country);
console.log(hijriDate);

//Output
{
   "date":"24-02-1446",
   "format":"DD-MM-YYYY",
   "day":"24",
   "weekday":{
      "en":"Al Juma'a",
      "ar":"الجمعة"
   },
   "month":{
      "number":2,
      "en":"Ṣafar",
      "ar":"صَفَر"
   },
   "year":"1446",
   "designation":{
      "abbreviated":"AH",
      "expanded":"Anno Hegirae"
   },
   "holidays":[]
}
```

## License

This package is freely available for everyone to use. If you find it beneficial, please remember me in your prayers.  
May Allah forgive my sins and have mercy on all of us. Ameen.

## Contact

If you have any questions, suggestions, or would like to collaborate, please feel free to reach out:

- **Email:** [ahmadbilal.3491@gmail.com](mailto:ahmadbilal.3491@gmail.com)
- **LinkedIn:** [Ahmad Bilal](https://www.linkedin.com/in/ahmad-bilal-920637165)

I look forward to hearing from you!

## Credits

This package utilizes the following resources:

- **Quran and Translations:** [Surah Quran](https://surahquran.com)  
- **Tafseer (Commentaries):** [Tafsir API by spa5k](https://github.com/spa5k/tafsir_api)  
- **Hadith Collections:** [Hadith API by fawazahmed](https://github.com/fawazahmed0/hadith-api)  
- **Hijri Calendar and Prayer Times:** [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api)

We are grateful to these resources for making their data available for public use.


[build-img]:https://github.com/dev-ahmadbilal/islam.js/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/dev-ahmadbilal/islam.js/actions/workflows/release.yml
[npm-img]:https://img.shields.io/npm/v/typescript-npm-package-template
[npm-url]:https://www.npmjs.com/package/typescript-npm-package-template
[issues-img]:https://img.shields.io/github/issues/ryansonshine/typescript-npm-package-template
[issues-url]:https://github.com/dev-ahmadbilal/islam.js/issues
[codecov-img]:https://codecov.io/gh/ryansonshine/typescript-npm-package-template/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/ryansonshine/typescript-npm-package-template
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
