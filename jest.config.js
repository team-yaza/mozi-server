const {
  compilerOptions: { paths },
} = require('./tsconfig');
const { resolve } = require('path');

const moduleNameMapper = {}; //jest환경에서도 module Alias를 사용하기 위해 tsConfig의 paths를 가공해서 설정해줍니다.

for (const key in paths) {
  const moduleName = `${key.slice(0, key.length - 1)}(.*)$`;
  moduleNameMapper[moduleName] = resolve(__dirname, `./${paths[key][0].slice(0, paths[key][0].length - 1)}$1`);
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', //jest를 node 환경에서 돌리기 위해선 testEnvironment 설정이 필요합니다.
  setupFiles: ['dotenv/config'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'], //테스트가 돌아가기 전에 의존성이나 추가 환경을 구성하기위한 setup file입니다.
  moduleNameMapper,
};
