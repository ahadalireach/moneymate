import {
  ArrowDownIcon,
  ArrowUpIcon,
  DotsThreeOutlineIcon,
} from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import {
  colors,
  spacingX,
  spacingY,
  radius,
  shadows,
} from "../constants/theme";
import Typo from "./Typo";
import { WalletType } from "../types";
import useFetchData from "../hooks/useFetchData";
import { verticalScale } from "../utils/styling";
import { useAuth } from "../contexts/authContext";
import { orderBy, where } from "firebase/firestore";

const HomeCard = () => {
  const { user } = useAuth();

  const { data: wallets, isLoading: walletLoading } = useFetchData<WalletType>(
    "wallets",
    user?.uid ? [where("uid", "==", user.uid), orderBy("created", "desc")] : []
  );

  const getTotals = () => {
    return wallets.reduce(
      (totals: any, item: WalletType) => {
        totals.balance = totals.balance + Number(item.amount);
        totals.income = totals.income + Number(item.totalIncome);
        totals.expenses = totals.expenses + Number(item.totalExpenses);
        return totals;
      },
      { balance: 0, income: 0, expenses: 0 }
    );
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.bgSolid}>
        <View style={styles.container}>
          <View>
            <View style={styles.totalBalanceRow}>
              <Typo size={16} fontWeight={"medium"} color={colors.white}>
                Total Balance
              </Typo>
              <View style={styles.dotsContainer}>
                <DotsThreeOutlineIcon
                  size={verticalScale(22)}
                  color={colors.white}
                  weight="fill"
                />
              </View>
            </View>
            <View style={styles.balanceContainer}>
              <Typo color={colors.white} size={36} fontWeight={"800"}>
                <Typo color={colors.white} fontWeight={"800"} size={20}>
                  $
                </Typo>{" "}
                {walletLoading ? "----" : getTotals()?.balance.toFixed(2)}
              </Typo>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <View style={styles.statCard}>
                <View style={styles.incomeExpense}>
                  <View
                    style={[
                      styles.statsIcon,
                      { backgroundColor: "rgba(16, 185, 129, 0.15)" },
                    ]}
                  >
                    <ArrowDownIcon
                      size={verticalScale(16)}
                      color={colors.incomeLight}
                      weight="bold"
                    />
                  </View>
                  <Typo size={14} color={colors.incomeLight} fontWeight={"600"}>
                    Income
                  </Typo>
                </View>
                <View style={styles.amountContainer}>
                  <Typo size={18} color={colors.incomeLight} fontWeight={"700"}>
                    <Typo
                      color={colors.incomeLight}
                      fontWeight={"700"}
                      size={12}
                    >
                      $
                    </Typo>{" "}
                    {walletLoading ? "----" : getTotals()?.income.toFixed(2)}
                  </Typo>
                </View>
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statCard}>
                <View style={styles.incomeExpense}>
                  <View
                    style={[
                      styles.statsIcon,
                      { backgroundColor: "rgba(239, 68, 68, 0.15)" },
                    ]}
                  >
                    <ArrowUpIcon
                      size={verticalScale(16)}
                      color={colors.expenseLight}
                      weight="bold"
                    />
                  </View>
                  <Typo
                    size={14}
                    color={colors.expenseLight}
                    fontWeight={"600"}
                  >
                    Expense
                  </Typo>
                </View>
                <View style={styles.amountContainer}>
                  <Typo
                    size={18}
                    color={colors.expenseLight}
                    fontWeight={"700"}
                  >
                    <Typo
                      color={colors.expenseLight}
                      fontWeight={"700"}
                      size={12}
                    >
                      $
                    </Typo>{" "}
                    {walletLoading ? "----" : getTotals()?.expenses.toFixed(2)}
                  </Typo>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: radius._24,
    ...shadows.large,
    overflow: "hidden",
    marginVertical: spacingY._5,
  },
  bgSolid: {
    minHeight: verticalScale(220),
    width: "100%",
    borderRadius: radius._24,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  container: {
    flex: 1,
    padding: spacingX._25,
    paddingVertical: verticalScale(20),
    justifyContent: "space-between",
  },
  dotsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: radius._12,
    padding: spacingY._7,
  },
  balanceContainer: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(15),
  },
  totalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(5),
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: verticalScale(15),
    gap: spacingX._10,
  },
  statItem: {
    flex: 1,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: radius._15,
    padding: verticalScale(12),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsIcon: {
    padding: spacingY._7,
    borderRadius: radius._12,
    width: verticalScale(36),
    height: verticalScale(36),
    justifyContent: "center",
    alignItems: "center",
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
    marginBottom: spacingY._10,
  },
  amountContainer: {
    alignItems: "flex-start",
  },
});
