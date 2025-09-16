import {
  TransactionItemProps,
  TransactionListType,
  TransactionType,
} from "../types";
import Typo from "./Typo";
import Loading from "./Loading";
import { useRouter } from "expo-router";
import { Timestamp } from "firebase/firestore";
import { FlashList } from "@shopify/flash-list";
import { verticalScale } from "../utils/styling";
import Animated, { FadeInDown } from "react-native-reanimated";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { expenseCategories, incomeCategory } from "../constants/data";
import { colors, radius, spacingX, spacingY } from "../constants/theme";

const TransactionList = ({
  data,
  title,
  isLoading,
  emptyListMessage,
}: TransactionListType) => {
  const router = useRouter();

  const handleClick = (item: TransactionType) => {
    router.push({
      pathname: "/(modals)/TransactionModal",
      params: {
        id: item?.id,
        type: item?.type,
        amount: item?.amount?.toString(),
        category: item?.category,
        date: (item.date as Timestamp)?.toDate()?.toISOString(),
        description: item.description,
        image: item?.image,
        uid: item?.uid,
        walletId: item?.walletId,
      },
    });
  };

  return (
    <View style={styles.container}>
      {title && (
        <Typo size={20} fontWeight={"500"} color={colors.text}>
          {title}
        </Typo>
      )}
      <View style={styles.list}>
        <FlashList
          data={data}
          renderItem={({ item, index }) => (
            <TransactionItem
              item={item}
              index={index}
              handleClick={handleClick}
            />
          )}
        />
      </View>
      {!isLoading && data.length === 0 && (
        <Typo
          size={15}
          color={colors.textLight}
          style={{ textAlign: "center", marginTop: spacingY._15 }}
        >
          {emptyListMessage}
        </Typo>
      )}
      {isLoading && (
        <View style={{ top: verticalScale(100) }}>
          <Loading />
        </View>
      )}
    </View>
  );
};

const TransactionItem = ({
  item,
  index,
  handleClick,
}: TransactionItemProps) => {
  let category =
    item?.type === "income"
      ? incomeCategory
      : expenseCategories[item.category!];
  const IconComponent = category.icon;

  const date = (item?.date as Timestamp)
    ?.toDate()
    ?.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80)
        .springify()
        .damping(14)}
    >
      <TouchableOpacity style={styles.row} onPress={() => handleClick(item)}>
        <View style={[styles.icon, { backgroundColor: category.bgColor }]}>
          {IconComponent && (
            <IconComponent
              size={verticalScale(25)}
              weight="fill"
              color={colors.white}
            />
          )}
        </View>

        <View style={styles.categoryDes}>
          <Typo size={17} color={colors.text}>
            {category.label}
          </Typo>
          <Typo
            size={12}
            color={colors.textLight}
            textProps={{ numberOfLines: 1 }}
          >
            {item?.description ? item?.description : "-"}
          </Typo>
        </View>

        <View style={styles.amountDate}>
          <Typo
            fontWeight={"500"}
            color={item?.type === "income" ? colors.income : colors.error}
          >
            {item?.type === "income" ? "+ $" : "- $"}
            {item?.amount}
          </Typo>
          <Typo size={13} color={colors.textLight}>
            {date}
          </Typo>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    gap: spacingY._17,
  },
  list: {
    minHeight: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacingX._12,
    marginBottom: spacingY._12,
    // list with background
    backgroundColor: colors.card,
    padding: spacingY._10,
    paddingHorizontal: spacingY._10,
    borderRadius: radius._16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    height: verticalScale(44),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius._12,
    borderCurve: "continuous",
  },
  categoryDes: {
    flex: 1,
    gap: 2.5,
  },
  amountDate: {
    alignItems: "flex-end",
    gap: 3,
  },
});
