import * as React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BackHeader from "../basic/BackHeader";
import { Text, View } from "../Themed";

type Props = {
  Picker: React.ReactElement;
  title: string;
  subTitle: string;
  nextButtonText?: string;
  onPressForgetButton?: () => void;
  onPressNextButton?: () => void;
};

const SettingsScreenTemplate: React.FC<Props> = ({
  title,
  subTitle,
  Picker,
  nextButtonText = "다음",
  onPressForgetButton,
  onPressNextButton,
}) => {
  return (
    <View style={styles.container}>
      <BackHeader border={false} />

      <ScrollView>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        <View style={styles.pickerWrapper}>{Picker}</View>

        {onPressForgetButton && (
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
            onPress={onPressForgetButton}
          >
            <View style={styles.pickerWrapper}>
              <Text style={styles.forgetText}>기억이 나지 않아요</Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>

      <TouchableOpacity activeOpacity={0.7} onPress={onPressNextButton}>
        <View style={styles.nextButtonWrapper}>
          <Text style={styles.nextButtonText}>{nextButtonText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreenTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {
    padding: 20,
  },
  title: {
    fontSize: 34,
  },
  subTitle: {
    fontSize: 13,
    marginTop: 5,
    marginLeft: 3,
  },
  pickerWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  forgetWrapper: {},
  forgetText: {
    color: "#a9a9a9",
    textAlign: "center",
    fontSize: 13,
  },
  nextButtonWrapper: {
    backgroundColor: "#000",
    height: 78,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 16 : 0,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});
