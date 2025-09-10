import { useEffect } from "react";
import { useRouter } from "expo-router";
import { colors } from "../constants/theme";
import { Image, StyleSheet, View } from "react-native";

const Index = () => {
  const router = useRouter();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       router.push("/(auth)/Welcome");
  //     }, 2000);
  //   }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/logo.png")}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "20%",
    aspectRatio: 1,
  },
});
