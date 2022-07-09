import jest from 'jest';
process.env.NODE_ENV = 'test';

const argv = process.argv.slice(2);

// console.log(argv);
// 추가적인 테스트 환경 설정 가능

jest.run(argv);
