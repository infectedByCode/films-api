module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '!**/db/**', '!**/*.d.ts', '!**/listen.ts', '!**/knexfile.ts'],
  modulePathIgnorePatterns: ['src/db'],
};
