import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";


export class UserRepository{
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}


  async findOne(userFilterQuery: FilterQuery<User>): Promise<User>{
    return this.userModel.findOne(userFilterQuery);
  }

  async find(userFilterQyuery: FilterQuery<User>): Promise<User[]>{
    return this.userModel.find(userFilterQyuery)
  }

  async create(user: User): Promise<User>{
    return new this.userModel(user).save();
  }

  async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User>{
    return this.userModel.findOneAndUpdate(userFilterQuery, user, {new: true})
  }
}