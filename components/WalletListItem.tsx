import Typo from "./Typo";
import { Image } from "expo-image";
import { Router } from "expo-router";
import { WalletType } from "../types";
import { verticalScale } from "../utils/styling";
import { CaretRightIcon } from "phosphor-react-native";
import { colors, radius, spacingX } from "../constants/theme";
import Animated, { FadeInDown } from "react-native-reanimated";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const WalletListItem = ({
  item,
  index,
  router,
}: {
  item: WalletType;
  index: number;
  router: Router;
}) => {
  const openWallet = () => {
    router.push({
      pathname: "/(modals)/WalletModal",
      params: {
        id: item?.id,
        name: item?.name,
        image: item?.image,
      },
    });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)
        .springify()
        .damping(13)}
    >
      <TouchableOpacity style={styles.container} onPress={openWallet}>
        <View style={styles.imageContainer}>
          <Image
            style={{ flex: 1 }}
            source={item?.image}
            contentFit="cover"
            transition={100}
          />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={16} color={colors.text}>
            {item?.name}
          </Typo>
          <Typo size={14} color={colors.textLight}>
            ${item?.amount}
          </Typo>
        </View>
        <CaretRightIcon
          size={verticalScale(20)}
          weight="bold"
          color={colors.textLight}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WalletListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
    backgroundColor: colors.card,
    padding: verticalScale(12),
    paddingHorizontal: spacingX._12,
    borderRadius: radius._16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    height: verticalScale(44),
    width: verticalScale(44),
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: radius._12,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  nameContainer: {
    flex: 1,
    gap: 2.5,
    marginLeft: spacingX._12,
  },
});
