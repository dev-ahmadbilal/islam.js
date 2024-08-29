/* eslint-disable @typescript-eslint/no-explicit-any */
import { HadithInfo } from '../types';
import { HadithApiResponse, HadithEditionApiResponse, HadithInfoApiResponse } from '../types/hadith-api-response';
import { HadithBySection } from '../types/hadith-by-section';
import { HadithEdition } from '../types/hadith-edition';
import { HadithObject } from '../types/hadith-object';

export function mapHadithInfoResponse(response: HadithInfoApiResponse): HadithInfo {
  const hadithInfo: HadithInfo = {};

  Object.keys(response).forEach((key) => {
    const apiHadith = response[key];

    hadithInfo[key] = {
      hadiths: apiHadith.hadiths.map((hadith) => ({
        arabicNumber: hadith.arabicnumber,
        grades: hadith.grades,
        hadithNumber: hadith.hadithnumber,
        reference: hadith.reference,
      })) as any,
      metadata: {
        lastHadithNumber: apiHadith.metadata.last_hadithnumber,
        name: apiHadith.metadata.name,
        sections: Object.keys(apiHadith.metadata.section_details).map((sectionKey) => {
          const sectionData = apiHadith.metadata.section_details[parseInt(sectionKey)];

          return {
            name: apiHadith.metadata.sections[parseInt(sectionKey)],
            details: {
              arabicNumberFirst: sectionData.arabicnumber_first,
              arabicNumberLast: sectionData.arabicnumber_last,
              hadithNumberFirst: sectionData.hadithnumber_first,
              hadithNumberLast: sectionData.hadithnumber_last,
            },
          };
        }) as any,
      },
    };
  });

  return hadithInfo;
}

export function mapHadithEditionResponse(apiHadith: HadithEditionApiResponse): HadithEdition {
  const edition: HadithEdition = {
    hadiths: apiHadith.hadiths.map((hadith) => ({
      grades: hadith.grades,
      hadithNumber: hadith.hadithnumber,
      reference: hadith.reference,
      text: hadith.text,
    })) as any,
    metadata: {
      name: apiHadith.metadata.name,
      sections: Object.keys(apiHadith.metadata.section_details).map((sectionKey) => {
        const sectionData = apiHadith.metadata.section_details[parseInt(sectionKey)];

        return {
          name: apiHadith.metadata.sections[parseInt(sectionKey)],
          details: {
            arabicNumberFirst: sectionData.arabicnumber_first,
            arabicNumberLast: sectionData.arabicnumber_last,
            hadithNumberFirst: sectionData.hadithnumber_first,
            hadithNumberLast: sectionData.hadithnumber_last,
          },
        };
      }) as any,
    },
  };

  return edition;
}

export function mapHadithSectionResponse(resp: HadithApiResponse, sectionNo: number): HadithBySection {
  return {
    metadata: {
      name: resp.metadata.name,
      section: resp.metadata.section[sectionNo],
      sectionDetails: {
        arabicNumberFirst: resp.metadata.section_detail[sectionNo].arabicnumber_first,
        arabicNumberLast: resp.metadata.section_detail[sectionNo].arabicnumber_last,
        hadithNumberFirst: resp.metadata.section_detail[sectionNo].hadithnumber_first,
        hadithNumberLast: resp.metadata.section_detail[sectionNo].hadithnumber_last,
      },
    },
    hadiths: resp.hadiths.map((hadith) => ({
      arabicNumber: hadith.arabicnumber,
      grades: hadith.grades,
      hadithNumber: hadith.hadithnumber,
      reference: hadith.reference,
      text: hadith.text,
    })),
  };
}

export function mapHadithResponse(resp: HadithApiResponse): HadithObject {
  return {
    metadata: {
      name: resp.metadata.name,
      section: resp.metadata.section[1],
      sectionDetails: {
        arabicNumberFirst: resp.metadata.section_detail[1].arabicnumber_first,
        arabicNumberLast: resp.metadata.section_detail[1].arabicnumber_last,
        hadithNumberFirst: resp.metadata.section_detail[1].hadithnumber_first,
        hadithNumberLast: resp.metadata.section_detail[1].hadithnumber_last,
      },
    },
    hadith: {
      hadithNumber: resp.hadiths[0].hadithnumber,
      arabicNumber: resp.hadiths[0].arabicnumber,
      text: resp.hadiths[0].text,
      grades: resp.hadiths[0].grades,
    },
  };
}
