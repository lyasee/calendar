import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import useColorScheme from "../hooks/useColorScheme";
import CycleSettingsScreen from "../screens/settings/CycleSettingsScreen";
import LastDateSettingsScreen from "../screens/settings/LastDateSettingsScreen";
import PeriodSettingsScreen from "../screens/settings/PeriodSettingsScreen";
import { SettingsParamList } from "../types";

const SettingsStack = createStackNavigator<SettingsParamList>();

export default function SettingsNavigator() {
  const colorScheme = useColorScheme();

  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen
        name="CycleSettingsScreen"
        component={CycleSettingsScreen}
      />
      <SettingsStack.Screen
        name="PeriodSettingsScreen"
        component={PeriodSettingsScreen}
      />
      <SettingsStack.Screen
        name="LastDateSettingsScreen"
        component={LastDateSettingsScreen}
      />
    </SettingsStack.Navigator>
  );
}
