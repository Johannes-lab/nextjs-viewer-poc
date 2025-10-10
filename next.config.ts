import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Handle SASS tilde imports
      config.resolve.alias = {
        ...config.resolve.alias,
      };

      // Handle native modules - mark as external or ignore
      // perhaps not necessary
      config.externals = config.externals || [];

      // Handle .node files (native addons)
      // not sure necessary on the client...
      config.module.rules.push({
        test: /\.node$/,
        use: "node-loader",
      });

    }

    return config;
  },
  // Enable SCSS
  sassOptions: {
    includePaths: [path.join(process.cwd(), "node_modules")],
  },

  // Avoid optimization issues with large bundles
  experimental: {
    optimizePackageImports: ["@itwin/itwinui-react"],
  },
};

export default nextConfig;
