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
      <View style={[styles.button, style]}>
        <Loading color={colors.white} size="large" />
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
    borderRadius: radius._16,
    borderCurve: "continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
});
