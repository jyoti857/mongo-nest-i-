import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepository{
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){};

  async findOne(filterQuery: FilterQuery<User>): Promise<User>{
    return this.userModel.findOne(filterQuery);
  }
  // find multiple queries 
  async find(filterQuery: FilterQuery<User>): Promise<User[]>{
    return this.userModel.find(filterQuery);
  }

  async create(user: User): Promise<User>{
    const newUser = new this.userModel(user)
    return newUser.save();
  }

  async findAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User>{
    const findUserAndUpdate = this.userModel.findOneAndUpdate(userFilterQuery, user);
    return findUserAndUpdate;
  }
}