export interface HadithEdition {
  hadiths: [
    {
      grades: [{ name: string; grade: string }];
      hadithNumber: string | number;
      reference: { book: number; hadith: number };
      text: string;
    },
  ];
  metadata: {
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
}
