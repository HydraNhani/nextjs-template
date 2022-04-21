/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true
    },
    webpack: (config) => {
        if (!config.experiments) {
            config.experiments = {};
        };
        //Top level await (for TypeGraphQL)
        config.experiments.topLevelAwait = true;
        return config;
    }
};

module.exports = nextConfig;