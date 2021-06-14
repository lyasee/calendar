import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import BackHeader from "../components/basic/BackHeader";
import { Text, View } from "../components/Themed";
import { calendarData } from "../stores/calendar";
import { MenstruationCode } from "../types/data.types";
import moment from "moment";

const HistoryScreen = () => {
  const data = useSelector(calendarData);
  const items = Object.keys(data)
    .sort(function (a, b) {
      return new Date(a).getTime() - new Date(b).getTime();
    })
    .map((v) => {
      return {
        date: v,
        ...data[v],
      };
    });

  return (
    <View style={styles.container}>
      <BackHeader title="list" />
      <FlatList
        keyExtractor={(item) => `${item.date}`}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                padding: 14,
                borderBottomColor: "#fafafa",
                borderBottomWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>{moment(item.date).format("YYYY.MM.DD")}</Text>
              </View>
              <View>
                {item.월경 && (
                  <Text>
                    {item.월경 === MenstruationCode.START ? "월경시작" : null}
                    {item.월경 === MenstruationCode.ING ? "월경중" : null}
                    {item.월경 === MenstruationCode.END ? "월경마지막" : null}
                    {item.월경 === MenstruationCode.STARTANDEND
                      ? "월경 시작 및 마지막"
                      : null}

                    {item.월경 === MenstruationCode.ESTIMATE_START
                      ? "예상월경시작"
                      : null}
                    {item.월경 === MenstruationCode.ESTIMATE_ING
                      ? "예상월경중"
                      : null}
                    {item.월경 === MenstruationCode.ESTIMATE_END
                      ? "예상월경마지막"
                      : null}
                  </Text>
                )}
                {item.가임기 && <Text>가임기</Text>}
                {item.배란일 && <Text>배란일</Text>}
              </View>
            </View>
          );
        }}
        data={items}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
