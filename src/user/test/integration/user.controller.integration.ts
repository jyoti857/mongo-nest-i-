import { Test } from "@nestjs/testing"
import { Connection } from "mongoose";
import { AppModule } from "../../../app.module"
import { DatabaseService } from "../../database/database.service";
import { userStub } from "../stubs/user.stub";

describe("user controller", () => {
  let dbConnection: Connection;
  beforeAll(async() => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle()
    // get users 

    describe('get users', async() => {
      const users = await dbConnection.collection('guay').insertOne(userStub())
    })
  })

})