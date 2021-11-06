import { User } from "./schemas/user.schema";
import { UserRepository } from "./user.repository";
import {v4 as uuidv4} from 'uuid'
import { Injectable } from "@nestjs/common";
import { GetUserArgs } from "./dto/args/get-user-args.dto";
import { UpdateUserInput } from "./dto/input/update-user-input.dto";
import { CreateUserInput } from "./dto/input/create-user-input.dto";

@Injectable()
export class UserService{
  constructor(private readonly userRepository: UserRepository){}

  async getUserById(id: string): Promise<User>{
    return this.userRepository.findOne({userId: id})
  }

  async getUser(getUserArgs: GetUserArgs ){
    return this.userRepository.findOne(getUserArgs);
  }

  async getUsers(): Promise<User[]>{
    return this.userRepository.find({});
  }

  async createUser(createUserInput: CreateUserInput): Promise<any>{
    return this.userRepository.create({
      ...createUserInput,
      userId: uuidv4(),
      favoriteFoods: [] 
    })
  }

  // async updateUser(id: string, userDetails: Partial<User>): Promise<User>{
  //   return this.userRepository.findOneAndUpdate({userId: id}, {...userDetails})
  // }

  async updateUser(updateUserData: UpdateUserInput): Promise<User>{
    return this.userRepository.findOneAndUpdate({userId: updateUserData.userId}, updateUserData);
  }
}