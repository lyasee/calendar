import * as React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { View } from "../components/Themed";
import {
  CalendarList,
  DateObject,
  DayComponentProps,
} from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import AgendaList from "../components/agenda/AgendaList";
import { useDispatch, useSelector } from "react-redux";
import {
  calendarData,
  calendarSelectedDate,
  setSelectedDate,
} from "../stores/calendar";
import CalendarDay from "../components/calendar/CalendarDay";
import { useNavigation } from "@react-navigation/core";
import { convertDateFormat, today } from "../utils/date";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import CalendarAddCircleButton from "../components/calendar/CalendarAddCircleButton";
import CalendarHeader from "../components/calendar/CalendarHeader";
import { calendarDataForMonth } from "../utils/calendar";

const { width: deviceWidth } = Dimensions.get("screen");
const SELECTED_DATE_FORMAT = "YYYY-MM-DD";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const markedData = useSelector(calendarData);
  const selectedDate = useSelector(calendarSelectedDate);

  const [visibleMonthDate, setVisibleMonthDate] = React.useState(
    moment().format(SELECTED_DATE_FORMAT)
  );

  const monthDetailItems = calendarDataForMonth(
    moment(visibleMonthDate).format("YYYY-MM"),
    markedData
  );

  const handlePressDay = (date: string) => {
    if (selectedDate === date) {
      navigation.navigate("CalendarInputScreen");
      return;
    }

    dispatch(setSelectedDate(date));
  };

  const handlePressToday = () => {
    dispatch(setSelectedDate(today()));
  };

  const handleChangeMonth = (months: DateObject[]) => {
    if (months.length > 0 && months[0]) {
      setVisibleMonthDate(convertDateFormat(months[0].dateString));
    }
  };

  const handlePressRecordButton = () => {
    navigation.navigate("CalendarInputScreen");
  };

  const handlePressListIcon = () => {
    navigation.navigate("HistoryScreen");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} />
      <ScrollView>
        <View style={styles.calendarWrapper}>
          <CalendarHeader
            month={visibleMonthDate}
            onPressMonth={handlePressToday}
            onPressListIcon={handlePressListIcon}
          />
          <CalendarList
            current={selectedDate}
            selected={selectedDate}
            renderHeader={() => null}
            onVisibleMonthsChange={handleChangeMonth}
            horizontal={true}
            pagingEnabled={true}
            calendarWidth={deviceWidth}
            style={{ height: 310 }}
            dayComponent={(props: DayComponentProps) => {
              const selected =
                convertDateFormat(props.date.dateString) === selectedDate;

              const data = props.date
                ? markedData[convertDateFormat(props.date.dateString)]
                : undefined;

              return (
                <CalendarDay
                  {...props}
                  selected={selected}
                  data={data}
                  onPressDay={handlePressDay}
                />
              );
            }}
          />
        </View>
        <View
          style={{ ...styles.information, borderColor: colors.borderColor }}
        >
          <AgendaList items={monthDetailItems} />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handlePressRecordButton}>
        <View style={styles.fixedButtonWrapper}>
          <CalendarAddCircleButton />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarWrapper: {
    marginTop: 16,
  },
  information: {
    borderTopWidth: 10,
    minHeight: 300,
  },
  fixedButtonWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
  },
});
