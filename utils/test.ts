import { ICalendar, MenstruationCode } from "../types/data.types";

export const sampleData: ICalendar = {
  settings: {
    월경주기: 28,
    월경기간: 5,
    마지막월경일: "2021-04-05",
  },
  data: {
    "2021-04-01": {
      월경: MenstruationCode.START,
      //   가임기: true,
    },
    "2021-04-02": {
      월경: MenstruationCode.ING,
      //   가임기: true,
    },
    "2021-04-03": {
      월경: MenstruationCode.ING,
      //   가임기: true,
    },
    "2021-04-04": {
      월경: MenstruationCode.ING,
      //   가임기: true,
    },
    "2021-04-05": {
      월경: MenstruationCode.END,
      //   가임기: true,
    },
  },
};
