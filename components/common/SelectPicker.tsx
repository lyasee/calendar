import React from "react";
import { Picker } from "@react-native-picker/picker";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";

interface SelectPickerItem {
  name: string;
  value: string;
}

interface Props {
  value: string;
  items: SelectPickerItem[];
  onChange: (value: string) => void;
}

const SelectPicker: React.FC<Props> = ({ value, items, onChange }) => {
  const handleChange = (itemValue: ItemValue) => {
    onChange(itemValue.toString());
  };

  return (
    <Picker selectedValue={value} onValueChange={handleChange}>
      {items.map((item) => {
        return (
          <Picker.Item key={item.value} label={item.name} value={item.value} />
        );
      })}
    </Picker>
  );
};

export default SelectPicker;
