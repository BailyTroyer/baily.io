const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  preset: "jest-presets/jest/node",
  testEnvironment: "jest-environment-jsdom",
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/src/components/hooks/usePosthog.ts",
    "<rootDir>/src/pages/_app.tsx",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
