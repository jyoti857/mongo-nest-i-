import { Test } from "@nestjs/testing"
import { Connection } from "mongoose";
import { AppModule } from "../../../app.module"
import { DatabaseService } from "../../database/database.service";
import { userStub } from "../stubs/user.stub";
import * as request from 'supertest'
import { INestApplication } from "@nestjs/common";
describe("user controller", () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: INestApplication;
  beforeAll(async() => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle()
    httpServer = app.getHttpServer();
  })
  // clean up after test
  afterAll(async() => {
    await app.close()
  })
  beforeEach(async() => {
    await dbConnection.collection('users').deleteMany({})
  })
  // get users  
  describe('get users', () => {
    it('it should create and return one user', async() => {
      const users = await dbConnection.collection('users').insertOne(userStub())
      const response = await request(httpServer).get('/users')
      expect(response.status).toBe(201)
      expect(response.body).toEqual(userStub())
    })
  })
  // create user 
  describe("create user ", () => {
    test('it should create a new user!', async() => {
      const createUser: {email: string; age: number}  = {
        email: userStub().email,
        age: userStub().age
      }
      const response = await request(httpServer).post('/users').send({
        ...createUser
      });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(userStub())
      const user = await dbConnection.collection('users').findOne({email: userStub().email})
      expect(user).toMatchObject(createUser);

    })
  })

  // get user
  describe("get user!", () => {
    test('get user by id!', async() => {
      const response = await request(httpServer).get('/users/:userId').send({
        userId: userStub().userId
      })
      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(userStub())
    })
  })

  // update use 
  describe("update user!", () => {
    const updateUser = {
      age: 12, 
      favoriteFoods: ['updateFood1', 'updateFood2']
    }
    test('update user', async () => {
      const user = await dbConnection.collection("users").findOne({userId: userStub().userId});
      const response  = await request(httpServer).put(`/users/:userId`).send({
        userId: user.userid,
        ...updateUser
      })
      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(user)
    })
  })
})