import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
     GraphQLModule.forRoot({
       autoSchemaFile: true,
     }),
    MongooseModule.forRoot('mongodb://localhost:27017/guay'), 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
