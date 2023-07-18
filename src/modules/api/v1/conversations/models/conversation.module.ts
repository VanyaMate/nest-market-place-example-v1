import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class Conversation {

    @Prop({ type: String })
    title: string;

}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
export type ConversationDocument = HydratedDocument<Conversation>;