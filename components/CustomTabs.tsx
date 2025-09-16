import {
  ChartBarIcon,
  HouseIcon,
  UserIcon,
  WalletIcon,
} from "phosphor-react-native";
import { verticalScale } from "../utils/styling";
import { colors, spacingY } from "../constants/theme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tabbarIcons: any = {
    index: (isFocused: boolean) => (
      <HouseIcon
        size={verticalScale(26)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.textLight}
      />
    ),
    Statistics: (isFocused: boolean) => (
      <ChartBarIcon
        size={verticalScale(26)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.textLight}
      />
    ),
    Wallet: (isFocused: boolean) => (
      <WalletIcon
        size={verticalScale(26)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.textLight}
      />
    ),
    Profile: (isFocused: boolean) => (
      <UserIcon
        size={verticalScale(26)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.textLight}
      />
    ),
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(70) : verticalScale(85),
    backgroundColor: colors.card,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: colors.border,
    borderTopWidth: 0.5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    paddingHorizontal: spacingY._15,
    paddingBottom: Platform.OS === "ios" ? spacingY._25 : spacingY._15,
  },
  tabbarItem: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacingY._12,
    paddingHorizontal: spacingY._12,
    borderRadius: 8,
    minWidth: verticalScale(48),
    minHeight: verticalScale(48),
    flex: 1,
  },
});
