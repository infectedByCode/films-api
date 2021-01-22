module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '!**/db/**', '!**/*.d.ts', '!**/listen.ts'],
  modulePathIgnorePatterns: ['src/db'],
};
