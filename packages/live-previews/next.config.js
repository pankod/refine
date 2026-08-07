/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // productionBrowserSourceMaps: true, // Disabled for now, as it causes build to hang on deploy
  swcMinify: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  output: "standalone",
  transpilePackages: ["@uiw/react-md-editor", "@ant-design/icons"],
};

module.exports = nextConfig;
