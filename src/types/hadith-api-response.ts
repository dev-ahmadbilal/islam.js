export interface HadithApiResponse {
  metadata: HadithMetadata;
  hadiths: HadithContent[];
}

interface HadithMetadata {
  name: string;
  section: Record<string, string>;
  section_detail: Record<
    string,
    {
      arabicnumber_first: string | number;
      arabicnumber_last: string | number;
      hadithnumber_first: string | number;
      hadithnumber_last: string | number;
    }
  >;
}

interface HadithContent {
  hadithnumber: number;
  arabicnumber: number;
  text: string;
  grades: [{ name: string; grade: string }];
  reference: [{ book: number; hadith: number }];
}

export interface HadithInfoApiResponse {
  [key: string]: {
    hadiths: [
      {
        arabicnumber: string | number;
        grades: [{ name: string; grade: string }];
        hadithnumber: string | number;
        reference: { book: number; hadith: number };
      },
    ];
    metadata: {
      last_hadithnumber: string | number;
      name: string;
      section_details: [
        Record<
          string,
          {
            arabicnumber_first: string | number;
            arabicnumber_last: string | number;
            hadithnumber_first: string | number;
            hadithnumber_last: string | number;
          }
        >,
      ];
      sections: [Record<string, string>];
    };
  };
}

export interface HadithEditionApiResponse {
  hadiths: [
    {
      grades: [{ name: string; grade: string }];
      hadithnumber: string | number;
      reference: { book: number; hadith: number };
      text: string;
    },
  ];
  metadata: {
    last_hadithnumber: string | number;
    name: string;
    section_details: [
      Record<
        string,
        {
          arabicnumber_first: string | number;
          arabicnumber_last: string | number;
          hadithnumber_first: string | number;
          hadithnumber_last: string | number;
        }
      >,
    ];
    sections: [Record<string, string>];
  };
}
