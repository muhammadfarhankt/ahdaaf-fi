import type { NextConfig } from "next";
import path from "path";

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

  // Externalize problematic packages from the server bundle
  serverExternalPackages: [
    "pino",
    "pino-pretty",
    "thread-stream",
    "@walletconnect/logger",
  ],

  // Exclude test directories from output file tracing
  outputFileTracingExcludes: {
    "*": [
      "node_modules/@walletconnect/logger/node_modules/thread-stream/test/**",
      "node_modules/**/test/**",
      "node_modules/**/benchmark/**",
    ],
  },

  // Turbopack configuration
  turbopack: {
    resolveAlias: {
      // Stub out test/dev dependencies that shouldn't be bundled
      tap: path.resolve(__dirname, "lib/empty-module.ts"),
      desm: path.resolve(__dirname, "lib/empty-module.ts"),
      fastbench: path.resolve(__dirname, "lib/empty-module.ts"),
      "pino-elasticsearch": path.resolve(__dirname, "lib/empty-module.ts"),
    },
  },

  webpack: (config, { webpack }) => {
    // Ignore test modules that shouldn't be bundled
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(tap|desm|fastbench|pino-elasticsearch)$/,
      })
    );

    // Ignore thread-stream test directory entirely
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /thread-stream[\\/]test/,
      })
    );

    // Fallback for node modules in browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      child_process: false,
    };

    return config;
  },
};

export default nextConfig;
