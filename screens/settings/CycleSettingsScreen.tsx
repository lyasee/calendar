import * as React from "react";
import { useNavigation } from "@react-navigation/core";
import { menstruationCycleDays } from "../../utils/date";
import SelectPicker from "../../components/common/SelectPicker";
import SettingsScreenTemplate from "../../components/settings/SettingsScreenTemplate";

const CycleSettingsScreen = () => {
  const navigation = useNavigation();
  const [items] = React.useState(menstruationCycleDays());
  const [cycle, setCycle] = React.useState("28");

  const handlePressForgetButton = () => {
    setCycle("28");
    handlePressNextButton();
  };

  const handlePressNextButton = () => {
    navigation.navigate("PeriodSettingsScreen", {
      cycle: Number(cycle),
    });
  };

  return (
    <SettingsScreenTemplate
      title="월경주기"
      subTitle="나에게 맞는 월경주기를 선택해주세요"
      Picker={<SelectPicker value={cycle} items={items} onChange={setCycle} />}
      onPressForgetButton={handlePressForgetButton}
      onPressNextButton={handlePressNextButton}
    />
  );
};

export default CycleSettingsScreen;
