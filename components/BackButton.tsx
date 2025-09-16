import { useRouter } from "expo-router";
import { BackButtonProps } from "../types";
import { verticalScale } from "../utils/styling";
import { colors, radius } from "../constants/theme";
import { CaretLeftIcon } from "phosphor-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

const BackButton = ({ style, iconSize = 26 }: BackButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.button, style]}
    >
      <CaretLeftIcon
        size={verticalScale(iconSize)}
        color={colors.text}
        weight="bold"
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.card,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: verticalScale(8),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
