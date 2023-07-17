import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/models/user.model';
import { HydratedDocument } from 'mongoose';


@Schema()
export class UserActive {

    @Prop({ type: Boolean, default: false })
    isActive: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User;

}

export const UserActiveSchema = SchemaFactory.createForClass(UserActive);
export type UserActiveDocument = HydratedDocument<UserActive>;