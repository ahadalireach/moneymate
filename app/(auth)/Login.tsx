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
import { useAuth } from "../../contexts/authContext";
import { AtIcon, LockIcon } from "phosphor-react-native";
import { colors, spacingY } from "../../constants/theme";
import { Alert, Pressable, StyleSheet, View } from "react-native";

const Login = () => {
  const { login } = useAuth();

  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(emailRef.current, passwordRef.current);
      if (!res.success) {
        Alert.alert("Login", res.msg);
      } else {
        Alert.alert("Success", "Logged in successfully!");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: spacingY._7, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"} color={colors.text}>
            Hey,
          </Typo>
          <Typo size={30} fontWeight={"800"} color={colors.text}>
            Welcome Back
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter} style={styles.subtitle}>
            Please sign in to continue managing your finances
          </Typo>
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

          <Button onPress={handleSubmit} isLoading={isLoading}>
            <Typo fontWeight={"700"} color={colors.white} size={20}>
              Sign In
            </Typo>
          </Button>

          <View style={styles.signUpLink}>
            <Typo size={15} color={colors.textLight}>
              Don&apos;t have an account?
            </Typo>
            <Pressable onPress={() => router.navigate("/(auth)/Register")}>
              <Typo size={15} fontWeight={"700"} color={colors.primary}>
                {" "}
                Sign Up
              </Typo>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

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
