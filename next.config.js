const { withSentryConfig } = require("@sentry/nextjs");

const { version } = require("./package.json");

const withYaml = require("next-plugin-yaml");

const withTM = require("next-transpile-modules")(["@codegouvfr/react-dsfr"]);

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff2|webmanifest)$/,
      type: "asset/resource",
    });
    return config;
  },
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_VERSION_COMMIT: process.env.GITHUB_SHA,
    NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT: process.env.PRODUCTION,
  },
};

module.exports = withTM(
  withYaml(withSentryConfig(moduleExports, { silent: true }))
);
