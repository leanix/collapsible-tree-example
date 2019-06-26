const path = require('path');
const { defaults } = require('jest-config');

const PROJECT_ROOT_PATH = path.resolve(__dirname, '.');

module.exports = {
  // The root directory that Jest should scan for tests and modules within
  rootDir: PROJECT_ROOT_PATH,

  // Indicates whether the coverage information should be collected
  collectCoverage: false,

  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'svg'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1'
  },

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$']
};
