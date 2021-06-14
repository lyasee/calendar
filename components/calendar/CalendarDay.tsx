import moment from "moment";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { DayComponentProps } from "react-native-calendars";
import {
  ICalendarData,
  MenstruationCode,
  OvulationCode,
} from "../../types/data.types";
import { Text } from "../Themed";

const { width: deviceWidth } = Dimensions.get("screen");

interface Props extends DayComponentProps {
  selected?: boolean;
  data?: ICalendarData;
  onPressDay?: (date: string) => void;
}

const dotSize = 5;

const CalendarDay: React.FC<Props> = ({ date, data, selected, onPressDay }) => {
  const menstruation = data && data.월경;
  const hasMenstruationInput =
    menstruation &&
    [
      MenstruationCode.START,
      MenstruationCode.END,
      MenstruationCode.ING,
      MenstruationCode.STARTANDEND,
    ].includes(data!.월경);

  const menstruationStart =
    menstruation && data!.월경 === MenstruationCode.START;
  const menstruationIng = menstruation && data!.월경 === MenstruationCode.ING;
  const menstruationEnd = menstruation && data!.월경 === MenstruationCode.END;
  const menstruationStartAndEnd =
    menstruation && data!.월경 === MenstruationCode.STARTANDEND;

  const menstruationEstimatedStart =
    menstruation && data!.월경 === MenstruationCode.ESTIMATE_START;
  const menstruationEstimatedIng =
    menstruation && data!.월경 === MenstruationCode.ESTIMATE_ING;
  const menstruationEstimatedEnd =
    menstruation && data!.월경 === MenstruationCode.ESTIMATE_END;

  const menstruationEstimated =
    menstruationEstimatedStart ||
    menstruationEstimatedIng ||
    menstruationEstimatedEnd;

  const ovulation = data && data.가임기;
  const hasOvulationInput =
    ovulation &&
    [OvulationCode.START, OvulationCode.END, OvulationCode.ING].includes(
      data!.가임기!
    );

  const handlePress = () => {
    onPressDay && onPressDay(moment(date.dateString).format("YYYY-MM-DD"));
  };

  const getBackgroundColor = () => {
    if (menstruation) {
      return hasMenstruationInput ? "#ffb3b3" : "#fcebeb";
    }

    if (ovulation) {
      return data!.배란일
        ? "#ccfdcf"
        : hasOvulationInput
        ? "#eeffef"
        : "transparent";
    }

    return "transparent";
  };

  const getBorderLeftRadius = () => {
    const m = [
      MenstruationCode.START,
      MenstruationCode.ESTIMATE_START,
      MenstruationCode.STARTANDEND,
    ].includes(data?.월경!);
    const o = [OvulationCode.START].includes(data?.가임기!);

    if (m) {
      return 20;
    } else if ([MenstruationCode.ING].includes(data?.월경!)) {
      return 0;
    }

    if (o) {
      return 20;
    }

    return 0;
  };

  const getBorderRightRadius = () => {
    const m = [
      MenstruationCode.END,
      MenstruationCode.ESTIMATE_END,
      MenstruationCode.STARTANDEND,
    ].includes(data?.월경!);
    const o = [OvulationCode.END].includes(data?.가임기!);

    if (m) {
      return 20;
    } else if ([MenstruationCode.ING].includes(data?.월경!)) {
      return 0;
    }

    if (o) {
      return 20;
    }

    return 0;
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
      <View
        style={{
          ...styles.container,
          width: deviceWidth / 7 - 4,
        }}
      >
        <View
          style={
            menstruation || ovulation
              ? {
                  width: deviceWidth / 7 - 4,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: getBackgroundColor(),
                  borderTopLeftRadius: getBorderLeftRadius(),
                  borderBottomLeftRadius: getBorderLeftRadius(),
                  borderTopRightRadius: getBorderRightRadius(),
                  borderBottomRightRadius: getBorderRightRadius(),
                }
              : {
                  width: deviceWidth / 7 - 4,
                  justifyContent: "center",
                  alignItems: "center",
                }
          }
        >
          {selected ? (
            <View
              style={{
                position: "absolute",
                top: -8,
                backgroundColor: "#f2f2f2",
                borderWidth: 1,
                borderColor: "#eaeaea",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                width: deviceWidth / 7 - 18,
                height: deviceWidth / 7 - 18,
                opacity: 0.8,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  color: selected ? "#ffab10" : "#000",
                  fontWeight: "bold",
                }}
              >
                {date.day}
              </Text>
            </View>
          ) : null}

          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              opacity: selected ? 0 : 1,
              color: selected ? "#ffab10" : "#000",
            }}
          >
            {date.day}
          </Text>
        </View>

        {/* {data && data.월경 && (
        <View
        style={{
          backgroundColor: "#f00",
          height: dotSize,
          width: dotSize,
          borderRadius: dotSize,
        }}
        />
      )} */}
      </View>
    </TouchableOpacity>
  );
};

export default CalendarDay;

const styles = StyleSheet.create({
  container: {
    height: 30,
  },
});
