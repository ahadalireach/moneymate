import { useRouter } from "expo-router";
import { WalletType } from "../../types";
import { verticalScale } from "../../utils/styling";
import { orderBy, where } from "firebase/firestore";
import useFetchData from "../../hooks/useFetchData";
import { useAuth } from "../../contexts/authContext";
import { PlusCircleIcon } from "phosphor-react-native";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, radius, spacingX, spacingY } from "../../constants/theme";
import { Loading, ScreenWrapper, Typo, WalletListItem } from "../../components";

const Wallet = () => {
  const router = useRouter();

  const { user } = useAuth();

  const { data: wallets, isLoading } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  const getTotalBalance = () =>
    wallets.reduce((total, item) => {
      total = total + (item.amount || 0);
      return total;
    }, 0);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={45} fontWeight={"500"} color={colors.white}>
              <Typo size={16} color={colors.white}>
                $
              </Typo>{" "}
              {getTotalBalance()?.toFixed(2)}
            </Typo>
            <Typo size={16} color={colors.white}>
              Total Balance
            </Typo>
          </View>
        </View>

        <View style={styles.wallets}>
          <View style={styles.flexRow}>
            <Typo size={20} fontWeight={"500"} color={colors.text}>
              My Wallets
            </Typo>
            <TouchableOpacity
              onPress={() => router.push("/(modals)/WalletModal")}
            >
              <PlusCircleIcon
                weight="fill"
                color={colors.primary}
                size={verticalScale(33)}
              />
            </TouchableOpacity>
          </View>

          {isLoading && <Loading />}
          <FlatList
            data={wallets}
            renderItem={({ item, index }) => {
              return (
                <WalletListItem item={item} index={index} router={router} />
              );
            }}
            contentContainerStyle={styles.listStyle}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._5,
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.card,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});
