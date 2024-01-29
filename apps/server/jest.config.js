/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 5000,
  roots: [ '<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
};
