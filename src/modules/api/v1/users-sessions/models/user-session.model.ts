import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/models/user.model';
import { HydratedDocument } from 'mongoose';


@Schema()
export class UserSession {

    @Prop({ type: String })
    session: string;

    @Prop({ type: String })
    login: string;

}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);
export type UserSessionDocument = HydratedDocument<UserSession>;