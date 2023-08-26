import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class User {

    @Prop({ type: String, unique: true, required: true })
    login: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, unique: true, required: true })
    email: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;