import * as React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../Themed";

type Props = {
  text1: string;
  text2: string;
};

const HomeDashboardBox: React.FC<Props> = ({ text1, text2 }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View
      style={{
        ...styles.dashboardBox,
        backgroundColor: colors.homeDashboardBoxBackground,
      }}
    >
      <Text
        style={{
          ...styles.dashboardBoxText,
          color: colors.homeDashboardBoxTextColor,
        }}
      >
        {text1}
      </Text>
      <Text
        style={{
          ...styles.dashboardBoxText,
          color: colors.homeDashboardBoxTextColor,
        }}
      >
        {text2}
      </Text>
    </View>
  );
};

export default HomeDashboardBox;

const styles = StyleSheet.create({
  dashboardBox: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
  },
  dashboardBoxText: {
    lineHeight: 21,
  },
});
