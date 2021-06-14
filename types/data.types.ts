export enum MenstruationCode {
  NONE = 0,
  START = 1,
  ING = 2,
  END = 3,
  STARTANDEND = 4,
  ESTIMATE_START = 11,
  ESTIMATE_ING = 12,
  ESTIMATE_END = 13,
}

export enum OvulationCode {
  NONE = 0,
  START = 1,
  ING = 2,
  END = 3,
}

export type ICalendarData = {
  월경: MenstruationCode;
  배란일?: boolean;
  가임기?: OvulationCode;
};

export type ICalendarSettings = {
  createdAt: string;
  updatedAt: string;
  월경주기: number;
  월경기간: number;
  마지막월경일: string;
};

export type ICalendar = {
  settings: ICalendarSettings;
  data: { [date: string]: ICalendarData };
};

export interface ICalendarDataForMonth extends ICalendarData {
  date: string;
}
