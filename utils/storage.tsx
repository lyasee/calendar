import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICalendar } from "../types/data.types";

export const DATA_KEY = "calendar_data";

export const getStorageData = async (): Promise<ICalendar> => {
  // await AsyncStorage.removeItem(DATA_KEY);
  const data = await AsyncStorage.getItem(DATA_KEY);

  if (data) {
    return JSON.parse(data);
  }

  return {
    settings: {
      createdAt: "",
      updatedAt: "",
      월경주기: 0,
      월경기간: 0,
      마지막월경일: "",
    },
    data: {},
  };
};

export const setStorageData = (data: ICalendar) => {
  return AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
};
