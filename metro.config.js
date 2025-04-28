const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  config.resolver.assetExts.push("png", "jpg", "jpeg", "svg");
  return config;
})();
