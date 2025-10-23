const { createDefaultPreset } = require("ts-jest");
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  preset: "ts-jest",                        // tell Jest to use ts-jest
  testEnvironment: "node",                  // node test environment
  roots: ["<rootDir>/tests"],               // look for tests in /tests
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    ...tsJestTransformCfg,                  // use ts-jest transform
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",         // optional alias support
  },
  collectCoverage: true,                    // collect coverage
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/index.ts",                        // exclude entry point if desired
  ],
  coverageDirectory: "coverage",            // output coverage folder
  verbose: true,                            // detailed test output
};
