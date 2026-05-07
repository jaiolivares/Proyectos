module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.ts", "**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.(ts|js)",
    "!src/**/index.ts",
    "!src/**/server.ts",
    "!src/**/prisma.ts",
    "!src/**/scripts/**",
    "!src/**/types/**",
    "!src/**/migrations/**"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html", "text-summary"],
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/", "/dist/", "/prisma/"]
};
