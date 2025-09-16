import {
  GearSixIcon,
  LockIcon,
  PowerIcon,
  UserIcon,
  CaretRightIcon,
} from "phosphor-react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { accountOptionType } from "../../types";
import { verticalScale } from "../../utils/styling";
import { useAuth } from "../../contexts/authContext";
import { getProfileImage } from "../../services/imageService";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Header, ScreenWrapper, Typo } from "../../components";
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import { colors, radius, spacingX, spacingY } from "../../constants/theme";

const accountOptions: accountOptionType[] = [
  {
    title: "Edit Profile",
    icon: <UserIcon size={26} color={colors.white} weight="fill" />,
    routeName: "/(modals)/ProfileModal",
    bgColor: colors.primary,
  },
  {
    title: "Settings",
    icon: <GearSixIcon size={26} color={colors.white} weight="fill" />,
    bgColor: colors.primary,
  },
  {
    title: "Privacy Policy",
    icon: <LockIcon size={26} color={colors.white} weight="fill" />,
    bgColor: colors.neutral500,
  },
  {
    title: "Logout",
    icon: <PowerIcon size={26} color={colors.white} />,
    bgColor: colors.error,
  },
];

const Profile = () => {
  const { user } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Logout"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: "destructive",
      },
    ]);
  };

  const handlePress = async (item: accountOptionType) => {
    if (item.title === "Logout") {
      showLogoutAlert();
    }

    if (item.routeName) router.push(item.routeName);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" style={{ marginVertical: spacingY._10 }} />

        <View style={styles.userInfo}>
          <View>
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
          </View>
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"} color={colors.text}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.textLight}>
              {user?.email}
            </Typo>
          </View>
        </View>
        <View style={styles.accountOptions}>
          {accountOptions.map((item, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 50)
                .springify()
                .damping(14)}
              style={styles.listItem}
              key={index}
            >
              <TouchableOpacity
                style={styles.flexRow}
                onPress={() => handlePress(item)}
              >
                <View
                  style={[styles.ListIcon, { backgroundColor: item?.bgColor }]}
                >
                  {item.icon && item.icon}
                </View>
                <Typo
                  size={17}
                  style={{ flex: 1 }}
                  fontWeight={"500"}
                  color={colors.text}
                >
                  {item.title}
                </Typo>
                <CaretRightIcon
                  size={verticalScale(20)}
                  weight="bold"
                  color={colors.textLight}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral500,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 3,
    borderColor: colors.neutral300,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },

  ListIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(12),
    backgroundColor: colors.card,
    padding: verticalScale(12),
    paddingHorizontal: spacingX._12,
    borderRadius: radius._16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  accountOptions: {
    marginTop: spacingY._25,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._12,
  },
});
