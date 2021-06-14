import moment from "moment";
import { ICalendarData, ICalendarDataForMonth } from "../types/data.types";

export const calendarDataForMonth = (
  monthDate: string,
  data: { [date: string]: ICalendarData }
): ICalendarDataForMonth[] => {
  const daysInMonth = moment(monthDate).daysInMonth();

  const result: ICalendarDataForMonth[] = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const days = i < 10 ? `0${i}` : i;
    const date = `${monthDate}-${days}`;
    const temp = data[date];

    if (temp) {
      result.push({
        date,
        ...temp,
      });
    }
  }

  return result;
};
