/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Splash: undefined;
  Settings: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
  CalendarInputScreen: undefined;
  HistoryScreen: undefined;
};

export type SettingsParamList = {
  CycleSettingsScreen: undefined;
  PeriodSettingsScreen: {
    cycle: number;
  };
  LastDateSettingsScreen: {
    cycle: number;
    period: number;
  };
};
