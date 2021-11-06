import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, FilterQuery, Model } from "mongoose";
import { EntityRepository } from "../databse/entity-repository";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepository extends EntityRepository<User & Document>{
    constructor(@InjectModel(User.name) userModel: Model<User & Document>){
        super(userModel)
    }
}