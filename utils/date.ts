import "moment";
import "moment/locale/ko";
import moment from "moment-timezone";

export const generatorArray1toN = (n: number) => {
  return Array.from(Array(n).keys());
};

export const menstruationCycleDays = (): { name: string; value: string }[] => {
  const result = [];

  for (let i = 15; i < 56; i++) {
    result.push({
      name: `${i}일`,
      value: `${i}`,
    });
  }

  return result;
  // return generatorArray1toN(31).map((n) => {
  //   return {
  //     name: `${n + 1}일`,
  //     value: `${n + 1}`,
  //   };
  // });
};

export const menstruationPeriodDays = (): { name: string; value: string }[] => {
  return generatorArray1toN(14).map((n) => {
    return {
      name: `${n + 1}일`,
      value: `${n + 1}`,
    };
  });
};

export enum ConvertDateFormat {
  Default = "YYYY-MM-DD",
  Comma = "YYYY.MM.DD",
}

export const convertDateFormat = (
  date: string | Date,
  format?: ConvertDateFormat
) => {
  return moment(date)
    .tz("Asia/Seoul")
    .format(format ? format : ConvertDateFormat.Default);
};

export const today = (format?: ConvertDateFormat) => {
  return moment()
    .tz("Asia/Seoul")
    .format(format ? format : ConvertDateFormat.Default);
};
