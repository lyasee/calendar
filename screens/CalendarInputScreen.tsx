import React from "react";
import "moment";
import "moment/locale/ko";
import moment from "moment-timezone";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackHeader from "../components/basic/BackHeader";
import { Text, View } from "../components/Themed";
import {
  calendarData,
  calendarSelectedDate,
  calendarSettings,
  setDataDetail,
  setLastDate,
} from "../stores/calendar";
import { MenstruationCode } from "../types/data.types";

const CalendarInputScreen: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(calendarSelectedDate);
  const settings = useSelector(calendarSettings);
  const data = useSelector(calendarData);
  const todayData = data[selectedDate];

  const showMenstruationStartButton =
    !todayData ||
    !todayData.월경 ||
    (todayData &&
      todayData.월경 &&
      ![MenstruationCode.END, MenstruationCode.ING].includes(todayData.월경));

  const menstruationStart =
    todayData &&
    todayData.월경 &&
    [MenstruationCode.START].includes(todayData.월경)
      ? true
      : false;

  const menstruationIng =
    todayData &&
    todayData.월경 &&
    [MenstruationCode.ING].includes(todayData.월경)
      ? true
      : false;

  const menstruationEnd =
    todayData &&
    todayData.월경 &&
    [MenstruationCode.END].includes(todayData.월경)
      ? true
      : false;

  const menstruationStartAndEnd =
    todayData &&
    todayData.월경 &&
    [MenstruationCode.STARTANDEND].includes(todayData.월경)
      ? true
      : false;

  const setMenstruationData = (date: string, code: MenstruationCode) => {
    const newData = { ...data[date], 월경: code };
    dispatch(setDataDetail({ date, data: newData }));

    if ([MenstruationCode.END, MenstruationCode.STARTANDEND].includes(code)) {
      dispatch(setLastDate(date));
    }

    if (
      settings.마지막월경일 === date &&
      [MenstruationCode.NONE].includes(code)
    ) {
      dispatch(setLastDate(""));
    }
  };

  const handlePressStart = () => {
    if (menstruationStart) {
      return;
    }

    if (menstruationStartAndEnd) {
      setMenstruationData(selectedDate, MenstruationCode.NONE);
      return;
    }

    if (
      !todayData ||
      !todayData.월경 ||
      [
        MenstruationCode.ESTIMATE_START,
        MenstruationCode.ESTIMATE_ING,
        MenstruationCode.ESTIMATE_END,
      ].includes(todayData.월경)
    ) {
      setMenstruationData(selectedDate, MenstruationCode.START);

      const start = moment(selectedDate).clone();
      for (let i = 2; i < settings.월경기간; i++) {
        const aaa = start.add(1, "days");
        const format = aaa.clone().tz("Asia/Seoul").format("YYYY-MM-DD");
        setMenstruationData(format, MenstruationCode.ING);
      }

      const last = start
        .clone()
        .add(1, "days")
        .tz("Asia/Seoul")
        .format("YYYY-MM-DD");

      setMenstruationData(last, MenstruationCode.END);
    }
  };

  const handlePressLast = () => {
    if (menstruationStartAndEnd) {
      setMenstruationData(selectedDate, MenstruationCode.NONE);
      return;
    }

    if (!todayData || !todayData.월경) {
      const start = moment(selectedDate).clone();
      let startDate = "";
      let endDate = "";
      let maxCount = 35;
      let count = 1;
      let condition = true;

      while (condition) {
        const prev = start.add(-1, "days");
        const prevString = prev.tz("Asia/Seoul").format("YYYY-MM-DD");
        const calendarData = data[prevString];
        const isMenstruationEnd =
          calendarData &&
          [MenstruationCode.END, MenstruationCode.STARTANDEND].includes(
            calendarData.월경
          );
        const isMenstruationStart =
          calendarData &&
          [MenstruationCode.START, MenstruationCode.STARTANDEND].includes(
            calendarData.월경
          );

        count = count + 1;

        if (isMenstruationStart) {
          condition = false;
          startDate = prevString;
        }

        if (isMenstruationEnd) {
          condition = false;
          endDate = prevString;
        }

        if (count > maxCount) {
          condition = false;
        }
      }

      if (endDate) {
        const diff = moment(selectedDate).clone().diff(moment(endDate), "days");

        const ingTempDate = moment(endDate).clone().add(-1, "days");
        for (let i = 0; i < diff; i++) {
          ingTempDate.add(1, "days");
          const ingDate = ingTempDate.tz("Asia/Seoul").format("YYYY-MM-DD");
          setMenstruationData(ingDate, MenstruationCode.ING);
        }

        const newEndDate = moment(selectedDate)
          .tz("Asia/Seoul")
          .format("YYYY-MM-DD");

        setMenstruationData(newEndDate, MenstruationCode.END);
      }

      return;
    }

    // selectedDate 가 4월 2일인 경우 2일부터 시작하여 1일씩 증가하면서 월경마지막날짜를 구함
    const start = moment(selectedDate).clone();
    let condition = true;
    let lastDate = "";
    let maxCount = 35;
    let count = 1;

    while (condition) {
      const next = start.add(1, "days");
      const calendarData = data[next.tz("Asia/Seoul").format("YYYY-MM-DD")];
      const isMenstruationEnd =
        calendarData &&
        [MenstruationCode.END, MenstruationCode.STARTANDEND].includes(
          calendarData.월경
        );
      const isMenstruationStart =
        calendarData &&
        [MenstruationCode.START, MenstruationCode.STARTANDEND].includes(
          calendarData.월경
        );

      count++;

      if (isMenstruationStart) {
        condition = false;
      }

      if (isMenstruationEnd) {
        condition = false;
        lastDate = next.tz("Asia/Seoul").format("YYYY-MM-DD");
      }

      if (count > maxCount) {
        condition = false;
      }
    }

    if (!lastDate) {
      return;
    }

    const temps: string[] = [];
    const date = moment(selectedDate).clone();
    while (date.isBefore(moment(lastDate))) {
      const a = date.add(1, "days");
      temps.push(a.clone().tz("Asia/Seoul").format("YYYY-MM-DD"));
    }

    temps.forEach((v) => {
      setMenstruationData(v, MenstruationCode.NONE);
    });

    if (temps.length > 0) {
      if (menstruationStart) {
        setMenstruationData(selectedDate, MenstruationCode.STARTANDEND);
      } else {
        setMenstruationData(selectedDate, MenstruationCode.END);
      }
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader border={false} />
      <ScrollView style={styles.scrollViewContainer}>
        <View style={{ marginTop: -10 }}>
          <Text style={{ fontSize: 20 }}>
            {moment(selectedDate).format("YYYY.MM.DD")}
          </Text>
        </View>

        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryTitle}>월경</Text>
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <TouchableOpacity
              disabled={!showMenstruationStartButton}
              onPress={handlePressStart}
            >
              <View
                style={{
                  ...styles.circleButton,
                  backgroundColor: menstruationStart
                    ? "#000"
                    : showMenstruationStartButton
                    ? "#fff"
                    : "#eaeaea",
                  marginRight: 20,
                }}
              >
                <Text style={{ color: menstruationStart ? "#fff" : "#000" }}>
                  월경시작
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePressLast}>
              <View
                style={{
                  ...styles.circleButton,
                  backgroundColor:
                    menstruationEnd || menstruationStartAndEnd
                      ? "#000"
                      : "#fff",
                }}
              >
                <Text
                  style={{
                    color:
                      menstruationEnd || menstruationStartAndEnd
                        ? "#fff"
                        : "#000",
                  }}
                >
                  오늘마지막
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryTitle}>피임약</Text>
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <View
              style={{
                ...styles.circleButton,
                marginRight: 20,
              }}
            >
              <Text style={{ color: "#000" }}>복용함</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 20,
  },
  categoryWrapper: {
    marginTop: 32,
  },
  categoryTitle: {
    fontSize: 14,
  },
  circleButton: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
});
