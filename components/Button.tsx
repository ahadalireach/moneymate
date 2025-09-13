import Loading from "./Loading";
import { CustomButtonProps } from "../types";
import { verticalScale } from "../utils/styling";
import { colors, radius } from "../constants/theme";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Button = ({
  style,
  onPress,
  isLoading = false,
  children,
}: CustomButtonProps) => {
  if (isLoading) {
    return (
      <View style={[styles.button, style, { backgroundColor: "transparent" }]}>
        <Loading />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius._17,
    borderCurve: "continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});
