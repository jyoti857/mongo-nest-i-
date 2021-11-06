import { Field, InputType } from "@nestjs/graphql";
import { IsEmpty, IsOptional } from "class-validator";


@InputType()
export class UpdateUserInput{
  
  @Field()
  @IsEmpty()
  userId: string;
  
  @Field()
  @IsOptional()
  @IsEmpty()
  age?: number;

  @Field({nullable: true})
  @IsOptional()
  isSubscribed?: boolean;
}