import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserRequest } from "./dto/request/create-user-request.dto";
import { UpdateUserRequest }from "./dto/request/update-user-request.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";


@Controller('users')
export class UserController{
  constructor(private readonly userService: UserService){}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User>{
    return this.userService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<any>{
    return this.userService.getUsers()
  }
  
  @Post()
  async createUser(@Body() createUserDto: CreateUserRequest): Promise<any>{
    return this.userService.createUser(createUserDto);
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUser: UpdateUserRequest): Promise<User>{
    return this.userService.updateUser({userId, ...updateUser});
  }

}