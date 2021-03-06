import { User } from "./schemas/user.schema";
import { UserRepository } from "./user.repository";
import {v4 as uuidv4} from 'uuid'
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
  constructor(private readonly userRepository: UserRepository){}

  async getUserById(id: string): Promise<User>{
    return this.userRepository.findOne({userId: id})
  }

  async getUsers(): Promise<User[]>{
    return this.userRepository.find({});
  }

  async createUser(email: string, age: number): Promise<any>{
    return this.userRepository.create({
      userId: uuidv4(),
      age,
      email,
      favoriteFoods: [] 
    })
  }

  async updateUser(id: string, userDetails: Partial<User>): Promise<User>{
    return this.userRepository.findOneAndUpdate({userId: id}, {...userDetails})
  }
}