module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^uuid$': 'uuid',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(uuid)/)',
  ],
  testMatch: ['**/__tests__/**/*.test.ts'],
  setupFilesAfterEnv: [],
};
