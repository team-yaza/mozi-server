// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';

// const MOCKING_PATH = '@tests/__mocks__';
// let mongoMemoryServer: MongoMemoryServer;

// beforeAll(async done => {
//   function clearDB() {
//     Object.values(mongoose.connection.collections).map(collection => {
//       collection.remove(() => {});
//     });
//     return done();
//   }

//   if (mongoose.connection.readyState === 0) {
//     mongoMemoryServer = new MongoMemoryServer();
//     mongoMemoryServer
//       .getConnectionString()
//       .then(mongoUri => {
//         process.env.MONGO_URI = mongoUri;
//         return mongoose.connect(mongoUri, {
//           useNewUrlParser: true,
//           poolSize: process.env.RUNNING_ENV === 'development' ? 10 : 100,
//         });
//       })
//       .then(async () => {
//         await createMocksInMongoDB();
//         done();
//       });
//   } else {
//     return clearDB();
//   }
// });

// afterAll(async done => {
//   await mongoose.disconnect();
//   await mongoMemoryServer.stop();
//   return done();
// });
// //자주쓰이는 기본 Mock Data들을 미리 생성해놓습니다.
// async function createMocksInMongoDB() {
//   await createUserMocks();
// 	...
// }
