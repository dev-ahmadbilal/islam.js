export interface HadithBySection {
  metadata: {
    name: string;
    section: string;
    sectionDetails: {
      arabicNumberFirst: string | number;
      arabicNumberLast: string | number;
      hadithNumberFirst: string | number;
      hadithNumberLast: string | number;
    };
  };
  hadiths: {
    hadithNumber: string | number;
    arabicNumber: string | number;
    text: string;
    grades: [{ name: string; grade: string }];
  }[];
}
