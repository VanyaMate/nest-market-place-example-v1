import { Injectable } from '@nestjs/common';
import { CreateConversationsDto } from './dto/create-conversations.dto';
import {
    Conversation,
    ConversationDocument,
} from './models/conversation.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';


@Injectable()
export class ConversationsService {

    constructor (@InjectModel(Conversation.name) private readonly conversationModel: Model<Conversation>) {
    }

    async create (createDto: CreateConversationsDto): Promise<Conversation> {
        const conversation: ConversationDocument = await this.conversationModel.create({ ...createDto });
        return conversation.toObject();
    }

    async delete (id: string): Promise<boolean> {
        const deleted: DeleteResult = await this.conversationModel.deleteOne({ _id: id });
        return !!deleted.deletedCount;
    }

}