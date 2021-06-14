import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../Themed";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

type Props = {
  month: string;
  onPressMonth?: () => void;
  onPressListIcon?: () => void;
};

const CalendarHeader: React.FC<Props> = ({
  month,
  onPressMonth,
  onPressListIcon,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={onPressMonth}>
        <Text style={styles.visibleMonth}>
          {moment(month).format("YYYY.MM")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressListIcon}>
        <View>
          <AntDesign name="profile" size={22} color={colors.tint} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  visibleMonth: {
    fontSize: 22,
    fontFamily: "elice-Bold",
  },
});
