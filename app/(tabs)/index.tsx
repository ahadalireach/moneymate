import {
  Button,
  HomeCard,
  ScreenWrapper,
  TransactionList,
  Typo,
} from "../../components";
import { useRouter } from "expo-router";
import { verticalScale } from "../../utils/styling";
import { useAuth } from "../../contexts/authContext";
import { MagnifyingGlassIcon, PlusIcon } from "phosphor-react-native";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const Home = () => {
  const router = useRouter();

  const { user } = useAuth();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Typo size={16} color={colors.neutral400}>
              Hello,
            </Typo>
            <Typo size={20} fontWeight={"500"}>
              {user?.name}
            </Typo>
          </View>
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => router.push("/(modals)/SearchModal")}
          >
            <MagnifyingGlassIcon
              size={verticalScale(22)}
              color={colors.neutral200}
              weight="bold"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <HomeCard />
          </View>

          <TransactionList
            data={[]}
            isLoading={false}
            emptyListMessage="No transactions yet!"
            title={"Recent Transactions"}
          />
        </ScrollView>

        <Button
          onPress={() => router.push("/(modals)/TransactionModal")}
          style={styles.floatingButton}
        >
          <PlusIcon
            color={colors.black}
            weight="bold"
            size={verticalScale(24)}
          />
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
