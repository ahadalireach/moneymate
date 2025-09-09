import React from "react";
import { router } from "expo-router";
import Typo from "../../components/Typo";
import Button from "../../components/Button";
import { verticalScale } from "../../utils/styling";
import ScreenWrapper from "../../components/ScreenWrapper";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const Welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <Animated.Image
            entering={FadeIn.duration(2000)}
            source={require("../../assets/images/welcome.png")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(12)}
            style={styles.titleContainer}
          >
            <Typo size={32} fontWeight={"800"} style={styles.titleText}>
              Take Complete Control
            </Typo>
            <Typo size={32} fontWeight={"800"} style={styles.titleText}>
              of Your Finances
            </Typo>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(100)
              .springify()
              .damping(12)}
            style={styles.subtitleContainer}
          >
            <Typo
              size={18}
              color={colors.textLight}
              style={styles.subtitleText}
            >
              Smart budgeting and financial insights
            </Typo>
            <Typo
              size={18}
              color={colors.textLight}
              style={styles.subtitleText}
            >
              for a wealthier tomorrow
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(200)
              .springify()
              .damping(12)}
            style={styles.buttonContainer}
          >
            <Button onPress={() => router.push("/(auth)/Register")}>
              <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
                Get Started
              </Typo>
            </Button>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/Login")}
              style={styles.signInLink}
            >
              <Typo size={16} color={colors.textLight} fontWeight={"500"}>
                Already have an account?
                <Typo size={16} color={colors.primary} fontWeight={"600"}>
                  {" "}
                  Sign In
                </Typo>
              </Typo>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(350),
    alignSelf: "center",
    marginTop: verticalScale(50),
  },
  footer: {
    backgroundColor: "#000000",
    alignItems: "center",
    paddingTop: spacingY._40,
    paddingBottom: spacingY._50,
    gap: spacingY._25,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    textAlign: "center",
    color: colors.white,
    lineHeight: 38,
  },
  subtitleContainer: {
    alignItems: "center",
  },
  subtitleText: {
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.85,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
    gap: spacingY._15,
  },
  signInLink: {
    alignItems: "center",
    paddingVertical: spacingY._12,
  },
});
