import moment, { Moment } from "moment";
import { MenstruationCode } from "../types/data.types";
import { convertDateFormat } from "./date";

export const menstruationDatesByLastDate = ({
  lastDate,
  period,
}: {
  lastDate: string;
  period: number;
}) => {
  const temps = [];

  const last = moment(lastDate).clone().add(1, "days");
  for (let i = 0; i < period; i++) {
    const type =
      i === 0
        ? MenstruationCode.END
        : i === period - 1
        ? MenstruationCode.START
        : MenstruationCode.ING;

    const date = last.add(-1, "days").tz("Asia/Seoul").format("YYYY-MM-DD");
    temps.push({ date, type });
  }

  return temps;
};

export const menstruationEstimatedDates = ({
  lastDate,
  cycle,
  period,
}: {
  lastDate: string;
  cycle: number;
  period: number;
}) => {
  const nextMenstruationDates = nextMenstruation({
    date: moment(lastDate),
    cycle,
    period,
  });

  const next2MenstruationDates = nextMenstruation({
    date: moment(nextMenstruationDates[period - 1]),
    cycle,
    period,
  });

  const next3MenstruationDates = nextMenstruation({
    date: moment(next2MenstruationDates[period - 1]),
    cycle,
    period,
  });

  return {
    next1: nextMenstruationDates,
    next2: next2MenstruationDates,
    next3: next3MenstruationDates,
  };
};

export const expectedOvulationDates = (lastDate: string) => {
  const expectedDate = moment(lastDate).clone();
  const ovulationDay = moment(expectedDate).add(14, "days");

  const ov_startDate = moment(ovulationDay).add(-4, "days");
  const ov_endDate = moment(ovulationDay).add(2, "days");

  let dates = [];
  while (ov_startDate.isSameOrBefore(ov_endDate)) {
    dates.push(convertDateFormat(ov_startDate.toISOString()));
    ov_startDate.add(1, "days");
  }

  return {
    ovulationDate: convertDateFormat(ovulationDay.toISOString()),
    dates,
  };
};

// export const calculator = () => {
//   const lastDate = "2021-05-01";
//   const cycle = 28;
//   const period = 5;

//   const expectedDate = moment(lastDate).add(cycle, "days");
//   const ovulationDay = moment(expectedDate).add(-14, "days");

//   const ov_startDate = moment(ovulationDay).add(-4, "days");
//   const ov_endDate = moment(ovulationDay).add(2, "days");

//   let dates = [];
//   while (ov_startDate.isSameOrBefore(ov_endDate)) {
//     dates.push(ov_startDate.format("YYYY-MM-DD"));
//     ov_startDate.add(1, "days");
//   }

//   const nextMenstruationDates = nextMenstruation({
//     date: moment(lastDate),
//     cycle,
//     period,
//   });

//   const next2MenstruationDates = nextMenstruation({
//     date: moment(nextMenstruationDates[period - 1]),
//     cycle,
//     period,
//   });

//   const next3MenstruationDates = nextMenstruation({
//     date: moment(next2MenstruationDates[period - 1]),
//     cycle,
//     period,
//   });
// };

export const nextMenstruation = ({
  date,
  period,
  cycle,
}: {
  date: Moment;
  period: number;
  cycle: number;
}) => {
  const start = date.clone().add(cycle, "days");
  const end = start.clone().add(period - 1, "days");

  let dates: string[] = [];
  while (start.isSameOrBefore(end)) {
    dates.push(start.format("YYYY-MM-DD"));
    start.add(1, "days");
  }

  return dates;
};
