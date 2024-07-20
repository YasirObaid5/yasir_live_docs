import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'img.clerk.com' }]
  }
};

// Determine whether to use Sentry based on the environment variable
const useSentry = process.env.SENTRY_DISABLED !== 'true';

const sentryConfig = {
  org: process.env.SENTRY_ORG || "myself-fv", // Use environment variable if available
  project: process.env.SENTRY_PROJECT || "javascript-nextjs",

  silent: true, // Suppress logs unless explicitly enabled

  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

// Export the config with or without Sentry based on the environment
export default useSentry
  ? withSentryConfig(nextConfig, sentryConfig)
  : nextConfig;