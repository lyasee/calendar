import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { MultiDotMarking } from "react-native-calendars";
import {
  ICalendar,
  ICalendarData,
  ICalendarSettings,
  MenstruationCode,
  OvulationCode,
} from "../types/data.types";
import {
  expectedOvulationDates,
  menstruationEstimatedDates,
} from "../utils/menstruation";
import { AppThunk, RootState } from "./index";

const SELECTED_DATE_FORMAT = "YYYY-MM-DD";

interface CalendarState {
  selectedDate: string;
  settings: ICalendarSettings;
  data: { [date: string]: ICalendarData };
  loading: boolean;
}

const initialState: CalendarState = {
  selectedDate: moment().format(SELECTED_DATE_FORMAT),
  settings: {
    createdAt: "",
    updatedAt: "",
    월경주기: 0,
    월경기간: 0,
    마지막월경일: "",
  },
  data: {},
  loading: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setData: (state, action: PayloadAction<ICalendar>) => {
      state.data = action.payload.data;
      state.settings = action.payload.settings;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLastDate: (state, action: PayloadAction<string>) => {
      state.settings = {
        ...state.settings,
        마지막월경일: action.payload,
      };
    },
    setDataDetail: (
      state,
      action: PayloadAction<{ date: string; data: ICalendarData | object }>
    ) => {
      const { date, data } = action.payload;

      state.data = {
        ...state.data,
        [date]: {
          ...state.data[date],
          ...data,
        },
      };
    },
  },
});

export const {
  setData,
  setLoading,
  setSelectedDate,
  setDataDetail,
  setLastDate,
} = calendarSlice.actions;

export const fetchGetEquips = (): AppThunk => async (dispatch) => {
  // setData({});
};

export const calendarData = (state: RootState) => {
  const settings = state.calendar.settings;
  const data = state.calendar.data;

  const menstruationEstimated = menstruationEstimatedDates({
    lastDate: settings.마지막월경일,
    cycle: settings.월경주기,
    period: settings.월경기간,
  });

  const result = { ...data };

  const menstruationEstimatedParser = (items: any[], date: string) => {
    items.forEach((estimateDate: string, index) => {
      const next1LastIndex = items.length - 1;

      const hasMenstruationInputData =
        data[estimateDate] &&
        [
          MenstruationCode.START,
          MenstruationCode.END,
          MenstruationCode.ING,
          MenstruationCode.STARTANDEND,
        ].includes(data[estimateDate].월경);

      const estimatedDataCode =
        index === 0
          ? MenstruationCode.ESTIMATE_START
          : index === next1LastIndex
          ? MenstruationCode.ESTIMATE_END
          : MenstruationCode.ESTIMATE_ING;

      if (!hasMenstruationInputData) {
        result[estimateDate] =
          date === estimateDate
            ? {
                ...result[date],
                월경: estimatedDataCode,
              }
            : {
                ...result[date],
                월경: estimatedDataCode,
              };
      }
    });
  };

  Object.keys(data).forEach((date) => {
    menstruationEstimatedParser(menstruationEstimated.next1, date);
    menstruationEstimatedParser(menstruationEstimated.next2, date);
    menstruationEstimatedParser(menstruationEstimated.next3, date);
  });

  const lastDates = Object.keys(result).filter((v) => {
    return (
      result[v] &&
      result[v].월경 &&
      [
        MenstruationCode.ESTIMATE_END,
        MenstruationCode.END,
        MenstruationCode.STARTANDEND,
      ].includes(result[v].월경)
    );
  });
  // expectedOvulationDates(settings.마지막월경일);

  lastDates.forEach((date) => {
    const { ovulationDate, dates } = expectedOvulationDates(date);

    result[ovulationDate] = {
      ...result[ovulationDate],
      배란일: true,
    };

    dates.forEach((v, index) => {
      const code =
        index === 0
          ? OvulationCode.START
          : index === dates.length - 1
          ? OvulationCode.END
          : OvulationCode.ING;

      result[v] = {
        ...result[v],
        가임기: code,
      };
    });
  });

  return result;
};

export const calendarSelectedDate = (state: RootState) =>
  state.calendar.selectedDate;

export const calendarSettings = (state: RootState) => state.calendar.settings;
export const calendarSettingsFinished = (state: RootState) =>
  state.calendar.settings.createdAt ? true : false;
export const calendarLastDate = (state: RootState) => {
  const { data } = state.calendar;

  const dates = Object.keys(data)
    .filter((v) => data[v] && data[v].월경 === MenstruationCode.END)
    .sort(function (a, b) {
      return new Date(b).getTime() - new Date(a).getTime();
    });

  return dates.length > 0 ? dates[0] : "";
};

export default calendarSlice.reducer;
