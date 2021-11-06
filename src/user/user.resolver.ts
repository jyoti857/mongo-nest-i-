import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { userInfo } from "os";
import { GetUserArgs } from "./dto/args/get-user-args.dto";
import { CreateUserInput } from "./dto/input/create-user-input.dto";
import { UpdateUserInput } from "./dto/input/update-user-input.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver{
  constructor(private readonly userService: UserService){}

  @Query(() => User, {name: 'user', nullable: true})
  async getUser(@Args()getUserArgs: GetUserArgs): Promise<User>{
    return this.userService.getUser(getUserArgs)
  }

  @Query(() => [User], {name: 'users', nullable: 'items'})
  async getUsers(): Promise<User[]>{
    return this.userService.getUsers()
  }

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<User>{
    return this.userService.createUser(createUserData);  
  }

  @Mutation()
  async updateUser(updateUserData: UpdateUserInput): Promise<User>{
    return this.userService.updateUser(updateUserData)
  }
}