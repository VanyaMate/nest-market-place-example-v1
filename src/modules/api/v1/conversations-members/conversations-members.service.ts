import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectId } from '../.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { ConversationMember } from './models/conversation-member.model';
import { Model } from 'mongoose';
import { NO_VALID_DATA } from '../../../../consts/error.conts';


@Injectable()
export class ConversationsMembersService {

    constructor (@InjectModel(ConversationMember.name) private readonly conversationMemberModel: Model<ConversationMember>) {
    }

    async addToConversation (login: string, conversationId: ObjectId | string): Promise<boolean> {
        try {
            await this.conversationMemberModel.create({
                login, conversation: conversationId,
            });
            return true;
        } catch (_) {
            throw new BadRequestException(NO_VALID_DATA);
        }
    }

    async removeFromConversation () {

    }

    async clearConversation () {

    }

}