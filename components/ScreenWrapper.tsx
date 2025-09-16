import { colors } from "../constants/theme";
import { ScreenWrapperProps } from "../types";
import { Dimensions, Platform, StatusBar, View } from "react-native";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 30;

  return (
    <View
      style={[
        style,
        { paddingTop, flex: 1, backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={colors.background}
      />
      {children}
    </View>
  );
};

export default ScreenWrapper;
