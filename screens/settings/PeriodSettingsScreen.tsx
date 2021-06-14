import * as React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { menstruationPeriodDays } from "../../utils/date";
import SelectPicker from "../../components/common/SelectPicker";
import SettingsScreenTemplate from "../../components/settings/SettingsScreenTemplate";
import { SettingsParamList } from "../../types";

type RouteProps = RouteProp<SettingsParamList, "PeriodSettingsScreen">;

const PeriodSettingsScreen = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const [items] = React.useState(menstruationPeriodDays());
  const [period, setPeriod] = React.useState("5");

  const handlePressForgetButton = () => {
    setPeriod("5");
    handlePressNextButton();
  };

  const handlePressNextButton = () => {
    navigation.navigate("LastDateSettingsScreen", {
      cycle: route.params.cycle,
      period: Number(period),
    });
  };

  return (
    <SettingsScreenTemplate
      title="월경기간"
      subTitle="나에게 맞는 월경기간를 선택해주세요"
      Picker={
        <SelectPicker value={period} items={items} onChange={setPeriod} />
      }
      onPressForgetButton={handlePressForgetButton}
      onPressNextButton={handlePressNextButton}
    />
  );
};

export default PeriodSettingsScreen;
