const { resolve } = require('path');

// Absolute Path Alias
const moduleNameMapper = {
  '@/(.*)$': resolve(__dirname, `./src/$1`),
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // 테스트가 돌아가기 전에 의존성이나 추가 환경을 구성하기위한 setup file입니다.
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper,
};
