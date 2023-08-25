import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class UserOnline {

    @Prop({ type: String, unique: true, required: true })
    login: string;

    @Prop({ type: Number, default: Date.now() })
    updatedOnline: number;

}

export const UserOnlineSchema = SchemaFactory.createForClass(UserOnline);
export type UserOnlineDocument = HydratedDocument<UserOnline>;