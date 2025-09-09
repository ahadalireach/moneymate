import {
  BackButton,
  Button,
  Input,
  ScreenWrapper,
  Typo,
} from "../../components";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { verticalScale } from "../../utils/styling";
import { AtIcon, LockIcon, UserIcon } from "phosphor-react-native";
import { colors, spacingY } from "../../constants/theme";
import { Alert, Pressable, StyleSheet, View } from "react-native";

const Register = () => {
  const router = useRouter();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Register", "Please fill all the fields");
      return;
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: spacingY._7, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Let&apos;s
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Get Started
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Create an account to track all your expenses
          </Typo>
          <Input
            onChangeText={(value) => (nameRef.current = value)}
            placeholder="Enter your name..."
            icon={<UserIcon size={26} color={colors.neutral200} />}
          />
          <Input
            onChangeText={(value) => (emailRef.current = value)}
            placeholder="Enter your email address"
            icon={<AtIcon size={26} color={colors.neutral400} />}
          />
          <Input
            onChangeText={(value) => (passwordRef.current = value)}
            secureTextEntry
            placeholder="Enter your password"
            icon={<LockIcon size={26} color={colors.neutral400} />}
          />

          <Button onPress={handleSubmit} loading={isLoading}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Register
            </Typo>
          </Button>

          <View style={styles.signUpLink}>
            <Typo size={15}>Already have an account?</Typo>
            <Pressable onPress={() => router.navigate("/(auth)/Login")}>
              <Typo size={15} fontWeight={"700"} color={colors.primary}>
                {" "}
                Login
              </Typo>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingY._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._25,
  },
  subtitle: {
    textAlign: "left",
    lineHeight: 22,
    opacity: 0.9,
    marginBottom: spacingY._5,
  },
  signUpLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacingY._15,
  },
});
