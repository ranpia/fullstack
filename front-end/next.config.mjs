/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.5.12"],
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,
  turbopack: {
    rules: {
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  reactStrictMode: false,
};

export default nextConfig;
