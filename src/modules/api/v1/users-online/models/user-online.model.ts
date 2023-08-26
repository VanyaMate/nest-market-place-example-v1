import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Data } from '@/helpers/types';


@Schema()
export class UserOnline extends Document {

    @Prop({ type: String, unique: true, required: true })
    login: string;

    @Prop({ type: Number, default: Date.now() })
    updatedOnline: number;

}

export const UserOnlineSchema = SchemaFactory.createForClass(UserOnline);
export type UserOnlineDocument = HydratedDocument<UserOnline>;