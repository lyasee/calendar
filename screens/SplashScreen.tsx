import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import LottieView from "lottie-react-native";

const { width: deviceWidth } = Dimensions.get("screen");

type Props = {
  onLayout?: () => void;
};

const SplashScreen: React.FC<Props> = ({ onLayout }) => {
  return (
    <View
      style={{
        backgroundColor: "#1b1a1a",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onLayout={onLayout}
    >
      <View style={{ paddingBottom: 12 }}>
        <Text
          style={{ fontFamily: "elice-light", color: "#e9e7e7", fontSize: 20 }}
        >
          사만다`s Calendar
        </Text>
      </View>
      <View style={{ paddingBottom: 100 }}>
        <LottieView
          autoPlay
          style={{
            width: deviceWidth - 200,
          }}
          source={require("../assets/lotties/hello.json")}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
