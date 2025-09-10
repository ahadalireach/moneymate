import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { verticalScale } from "../../utils/styling";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { Button } from "@react-navigation/elements";
import { ScreenWrapper } from "../../components";

const index = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ScreenWrapper>
      <View>
        <Text>index</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScreenWrapper>
  );
};

export default index;

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
