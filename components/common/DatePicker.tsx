import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { convertDateFormat } from "../../utils/date";

interface Props {
  date: Date;
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<Props> = ({ date, onChange }) => {
  const [show, setShow] = useState(false);
  const mode = "date";

  const handleChange = (event: any, selectedDate?: Date) => {
    if (!selectedDate) {
      return;
    }

    onChange(selectedDate);
  };

  if (Platform.OS === "ios") {
    return (
      <DateTimePicker
        locale="ko-KR"
        testID="datePicker"
        value={date}
        mode={mode}
        display="spinner"
        onChange={handleChange}
      />
    );
  }

  const handlePressDate = () => {
    setShow(!show);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePressDate}>
        <View>
          <Text>{convertDateFormat(date)}</Text>
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          locale="ko-KR"
          testID="datePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
