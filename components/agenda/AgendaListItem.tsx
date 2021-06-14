import moment from "moment";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import {
  ICalendarDataForMonth,
  MenstruationCode,
} from "../../types/data.types";
import { Text } from "../Themed";

type Props = {
  item: ICalendarDataForMonth;
};

const AgendaListItem: React.FC<Props> = ({ item }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const gerMenstruationParser = () => {
    if (item.월경 === MenstruationCode.START) {
      return "월경일";
    } else if (item.월경 === MenstruationCode.ING) {
      return "월경일";
    } else if (item.월경 === MenstruationCode.END) {
      return "월경일";
    } else if (item.월경 === MenstruationCode.STARTANDEND) {
      return "월경일";
    } else if (item.월경 === MenstruationCode.ESTIMATE_START) {
      return "월경 예정일";
    } else if (item.월경 === MenstruationCode.ESTIMATE_ING) {
      return "예상 예정일";
    } else if (item.월경 === MenstruationCode.ESTIMATE_END) {
      return "예상 예정일";
    } else {
      return "";
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.category, backgroundColor: colors.tint }}>
        <Text style={{ ...styles.categoryText, color: colors.reverseText }}>
          {`${moment(item.date).format("DD")}`}
        </Text>
      </View>
      <View style={styles.textWrapper}>
        {item.월경 && (
          <Text style={styles.text}>{gerMenstruationParser()}</Text>
        )}
        {item.가임기 && (
          <Text style={styles.text}>
            {item.월경 ? ", " : ""}
            {item.배란일 ? "배란일" : "가임기"}
          </Text>
        )}
      </View>
    </View>
  );
};

export default AgendaListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  category: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222222",
    borderRadius: 8,
    opacity: 0.92,
  },
  categoryText: {
    fontSize: 16,
    color: "#fff",
  },
  textWrapper: {
    marginLeft: 12,
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontSize: 13,
  },
});
