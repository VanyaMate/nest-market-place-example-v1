import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/models/user.model';
import { HydratedDocument } from 'mongoose';


@Schema()
export class UserSession {

    @Prop({ type: String })
    session: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User;

}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);
export type UserSessionDocument = HydratedDocument<UserSession>;