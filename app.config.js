import "dotenv/config";

export default {
  expo: {
    name: "MoneyMate",
    slug: "moneymate",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "moneymate",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/logo.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.moneymate.app",
      buildNumber: "1.0.0",
      icon: "./assets/images/logo.png",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo.png",
        backgroundColor: "#000000",
      },
      package: "com.moneymate.app",
      versionCode: 1,
      edgeToEdgeEnabled: true,
      icon: "./assets/images/logo.png",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo.png",
          imageWidth: 250,
          resizeMode: "contain",
          backgroundColor: "#000000",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      API_KEY: process.env.API_KEY,
      APP_ID: process.env.APP_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      CLOUD_NAME: process.env.CLOUD_NAME,
      UPLOAD_PRESET: process.env.UPLOAD_PRESET,
    },
  },
};
