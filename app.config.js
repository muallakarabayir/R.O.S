module.exports = {
    expo: {
      name: "R.O.S",
      slug: "ros",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      updates: {
        enabled: true,
      },
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        bundleIdentifier: "com.yourcompany.ros",
        buildNumber: "1.0.0",
      },
      android: {
        package: "com.yourcompany.ros",
        versionCode: 1,
      },
      web: {
        favicon: "./assets/images/favicon.png",
      },
      entryPoint: "./app/index.tsx", // Başlangıç dosyanız burada
    },
  };
  