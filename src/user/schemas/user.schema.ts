import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


export type UserDocument = User // just commented as it is not working will check ---> & Document;

@ObjectType()
@Schema()
export class User {
    @Field()
    @Prop()
    userId: string;
    
    @Field()
    @Prop()
    email: string;
    
    @Field()
    @Prop()
    age: number;
    
    @Field(() => [String])
    @Prop([String])
    favoriteFoods: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);