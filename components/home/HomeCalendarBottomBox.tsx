import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../Themed";

type Props = {
  text: string;
  buttonText: string;
  onPress?: () => void;
};

const HomeCalendarBottomBox: React.FC<Props> = ({
  text,
  buttonText,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View
      style={{
        ...styles.information,
        borderColor: colors.homeDashboardDividerBorderColor,
      }}
    >
      <View style={styles.messageWrapper}>
        <Text style={styles.message}>{text}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonWrapper}>
          <View
            style={{
              ...styles.button,
              backgroundColor: colors.buttonBackgroundColor,
            }}
          >
            <Text
              style={{ ...styles.buttonText, color: colors.buttonTextColor }}
            >
              {buttonText}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeCalendarBottomBox;

const styles = StyleSheet.create({
  information: {
    minHeight: 240,
    borderTopWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  messageWrapper: {
    padding: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 18,
  },
});
