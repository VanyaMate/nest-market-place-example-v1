import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';


@Schema()
export class UserActive {

    @Prop({ type: Boolean, default: false })
    isActive: boolean;

    @Prop({ type: String })
    login: string;

}

export const UserActiveSchema = SchemaFactory.createForClass(UserActive);
export type UserActiveDocument = HydratedDocument<UserActive>;