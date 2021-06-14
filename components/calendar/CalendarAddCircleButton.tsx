import * as React from "react";
import { View } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

const CalendarAddCircleButton = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View style={{ ...styles.button, backgroundColor: colors.tint }}>
      <Ionicons name="ios-add" size={30} color="#fff" />
    </View>
  );
};

export default CalendarAddCircleButton;

const styles = StyleSheet.create({
  button: {
    height: 54,
    width: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 54,
    paddingLeft: 2,
  },
});
