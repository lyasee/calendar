import moment from "moment";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ICalendarDataForMonth } from "../../types/data.types";
import { Text } from "../Themed";
import AgendaListItem from "./AgendaListItem";

interface Props {
  items: ICalendarDataForMonth[];
}

const AgendaList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <View style={styles.emptyWrapper}>
        <Text>이번달엔 아무런 내용이 없어요</Text>
      </View>
    );
  }

  return (
    <View>
      {items.map((item) => (
        <View key={`month-${item.date}`} style={styles.wrapper}>
          <AgendaListItem item={item} />
        </View>
      ))}
    </View>
  );
};

export default AgendaList;

const styles = StyleSheet.create({
  emptyWrapper: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  wrapper: {
    borderBottomWidth: 1,
    borderColor: "#f2f2f5",
  },
});
