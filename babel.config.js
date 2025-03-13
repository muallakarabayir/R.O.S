module.export = function(api) {
    api.cache(true);
    return {
        preset: ['babel-preset-expo'],
        plugins: ["nativewind/babel"],
    };
};