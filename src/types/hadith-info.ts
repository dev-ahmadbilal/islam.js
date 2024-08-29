export interface HadithInfo {
  [key: string]: {
    hadiths: [
      {
        arabicNumber: string | number;
        grades: [{ name: string; grade: string }];
        hadithNumber: string | number;
        reference: { book: number; hadith: number };
      },
    ];
    metadata: {
      lastHadithNumber: string | number;
      name: string;
      sections: [
        {
          name: string;
          details: {
            arabicNumberFirst: string | number;
            arabicNumberLast: string | number;
            hadithNumberFirst: string | number;
            hadithNumberLast: string | number;
          };
        },
      ];
    };
  };
}
