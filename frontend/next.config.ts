import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },

  turbopack: {
    root: __dirname,
  },

  webpack: (config, { webpack }) => {
    // Ignore 'tap' module requests from thread-stream test files
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^tap$/,
      })
    );

    // Also ignore thread-stream test directory entirely
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /thread-stream[\\/]test/,
      })
    );

    return config;
  },
};

export default nextConfig;
