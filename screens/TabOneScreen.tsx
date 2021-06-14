import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import {
  calendarLastDate,
  calendarSettings,
  calendarSettingsFinished,
} from "../stores/calendar";
import { ConvertDateFormat, convertDateFormat } from "../utils/date";
import HomeCalendarBottomBox from "../components/home/HomeCalendarBottomBox";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import HomeDashboardBox from "../components/home/HomeDashboardBox";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const navigation = useNavigation();
  const settings = useSelector(calendarSettings);
  const settingsFinished = useSelector(calendarSettingsFinished);
  const lastDate = useSelector(calendarLastDate);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} />
      <ScrollView>
        <View style={styles.dashboardWrapper}>
          <View>
            <View style={styles.dashboardContainer}>
              <HomeDashboardBox
                text1="평균 주기"
                text2={settings.월경주기 ? `${settings.월경주기}일` : "-"}
              />
              <HomeDashboardBox
                text1="평균 기간"
                text2={settings.월경기간 ? `${settings.월경기간}일` : "-"}
              />
              <HomeDashboardBox
                text1="마지막 월경일"
                text2={
                  lastDate
                    ? convertDateFormat(lastDate, ConvertDateFormat.Comma)
                    : "-"
                }
              />
            </View>
          </View>
          <LottieView
            autoPlay
            style={{ width: 230, opacity: 0.9 }}
            source={require("../assets/lotties/hello.json")}
          />
        </View>

        {settingsFinished ? (
          <HomeCalendarBottomBox
            text={`오늘 하루는 어떠셨나요?\n사만에게 오늘 하루를 알려주세요`}
            buttonText="캘린더에 기록하기"
            onPress={() => {
              navigation.navigate("Calendar");
            }}
          />
        ) : (
          <HomeCalendarBottomBox
            text={`초기 설정이 필요해요\n10초만에 설정해볼까요?`}
            buttonText="초기설정하기"
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        )}
      </ScrollView>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>사만다</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  titleWrapper: {
    position: "absolute",
    top: 50,
    padding: 20,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 28,
    fontFamily: "elice-Bold",
  },
  dashboardWrapper: {
    flexDirection: "row",
  },
  dashboardContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
});
