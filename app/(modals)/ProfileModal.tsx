import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BackButton,
  Button,
  Header,
  Input,
  ModalWrapper,
  Typo,
} from "../../components";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { UserDataType } from "../../types";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { PencilIcon } from "phosphor-react-native";
import { useAuth } from "../../contexts/authContext";
import { updateUser } from "../../services/userService";
import { scale, verticalScale } from "../../utils/styling";
import { getProfileImage } from "../../services/imageService";
import { colors, spacingX, spacingY } from "../../constants/theme";

const ProfileModal = () => {
  const router = useRouter();

  const { user, updateUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      image: user?.image || null,
    });
  }, [user]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setUserData({ ...userData, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    let { name } = userData;
    if (!name.trim()) {
      Alert.alert("User", "Name field can't be empty");
      return;
    }

    setIsLoading(true);
    try {
      const res = await updateUser(user?.uid as string, userData);
      setIsLoading(false);
      if (res.success) {
        updateUserData(user?.uid as string);
        router.back();
      } else {
        Alert.alert("User", res.msg);
      }
    } catch (error: any) {
      console.error("Update user error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(userData.image)}
              contentFit="cover"
              transition={100}
            />

            <TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
              <PencilIcon size={verticalScale(20)} color={colors.neutral800} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Name</Typo>
            <Input
              placeholder="Name"
              value={userData.name}
              onChangeText={(value) => {
                setUserData({ ...userData, name: value });
              }}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button loading={isLoading} onPress={onSubmit} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight={"700"}>
            Update
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    justifyContent: "space-between",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
