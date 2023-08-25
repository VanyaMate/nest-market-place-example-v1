import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    UserOnline,
    UserOnlineDocument,
} from './models/user-online.model';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DeleteResult } from 'mongodb';


@Injectable()
export class UsersOnlineService {

    constructor (@InjectModel(UserOnline.name) private readonly userOnline: Model<UserOnline>) {
    }

    async create (login: string): Promise<UserOnline> {
        const userOnline: UserOnlineDocument = await this.userOnline.create({
            login,
        });

        return userOnline.toObject();
    }

    async update (login: string, date: number = Date.now()): Promise<boolean> {
        const userOnline: UpdateWriteOpResult = await this.userOnline.updateOne({
            login,
        }, {
            $set: {
                updatedOnline: date,
            },
        });

        return !!userOnline.modifiedCount;
    }

    async delete (login: string): Promise<boolean> {
        const userOnline: DeleteResult = await this.userOnline.deleteOne({
            login,
        });

        return !!userOnline.deletedCount;
    }

}