// jest.config.js
const { defaults } = require('jest-config');

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      babelConfig: 'babel.config.json'
    }
  },
  preset: "ts-jest",
  roots: [
    "<rootDir>/src",
    "<rootDir>/test"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/dist/**",
    "!**/node_modules/**"
  ],
  moduleNameMapper:{
    "\\.(css|less|sass|scss)$": "<rootDir>/mock/styleMock.js"
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: "jsdom",
  testMatch: [
    "**/?*\.spec\.ts"
  ],
};
