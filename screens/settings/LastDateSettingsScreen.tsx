import * as React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { convertDateFormat } from "../../utils/date";
import DatePicker from "../../components/common/DatePicker";
import SettingsScreenTemplate from "../../components/settings/SettingsScreenTemplate";
import {
  ICalendar,
  ICalendarData,
  MenstruationCode,
} from "../../types/data.types";
import { SettingsParamList } from "../../types";
import { useDispatch } from "react-redux";
import { setData } from "../../stores/calendar";
import { menstruationDatesByLastDate } from "../../utils/menstruation";
import { setStorageData } from "../../utils/storage";
import "moment";
import "moment/locale/ko";
import moment from "moment-timezone";

type RouteProps = RouteProp<SettingsParamList, "LastDateSettingsScreen">;

const LastDateSettingsScreen = () => {
  const route = useRoute<RouteProps>();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [cycle] = React.useState(route.params.cycle);
  const [period] = React.useState(route.params.period);
  const [date, setDate] = React.useState(moment().toDate());

  const handlePressForgetButton = () => {
    submitHandler({ date: "", calendarData: {} });
  };

  const handlePressNextButton = () => {
    const dates = menstruationDatesByLastDate({
      lastDate: convertDateFormat(date),
      period,
    });
    console.log("dates: ", dates);

    const calendarData: { [date: string]: ICalendarData } = {};
    dates.forEach((v) => {
      calendarData[v.date] = {
        월경: v.type,
      };
    });

    submitHandler({
      date: convertDateFormat(date),
      calendarData,
    });
  };

  const submitHandler = async ({
    date,
    calendarData,
  }: {
    date: string;
    calendarData: { [date: string]: ICalendarData };
  }) => {
    const today = convertDateFormat(moment().toISOString());

    const data: ICalendar = {
      settings: {
        createdAt: today,
        updatedAt: today,
        월경주기: cycle,
        월경기간: period,
        마지막월경일: date,
      },
      data: calendarData,
    };

    dispatch(setData(data));
    await setStorageData(data);
    routerHandler();
  };

  const routerHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Root" }],
    });
  };

  return (
    <SettingsScreenTemplate
      title="마지막 월경일"
      subTitle="마지막 월경일을 선택해주세요"
      Picker={<DatePicker date={date} onChange={setDate} />}
      nextButtonText="설정 완료"
      onPressForgetButton={handlePressForgetButton}
      onPressNextButton={handlePressNextButton}
    />
  );
};

export default LastDateSettingsScreen;
