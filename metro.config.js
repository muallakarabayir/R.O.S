const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  crypto: require.resolve("crypto-browserify"),
  stream: require.resolve("stream-browserify"),
  path: require.resolve("path-browserify"),
  buffer: require.resolve("buffer"),
};

config.resolver.assetExts.push("png", "jpg", "jpeg", "svg");

module.exports = config;
