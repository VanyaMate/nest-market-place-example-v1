import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserActive } from './models/user-active.model';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';


@Injectable()
export class UsersActiveService {

    constructor (@InjectModel(UserActive.name) private readonly userActiveModel: Model<UserActive>) {
    }

    async create (login: string, isActive: boolean = false): Promise<UserActive> {
        try {
            return await this.userActiveModel.create({ login, isActive });
        } catch (_) {
            throw new BadRequestException('UserActive creation error');
        }
    }

    async change (login: string, isActive: boolean): Promise<boolean> {
        try {
            const updated: UpdateWriteOpResult = await this.userActiveModel.updateOne({ login }, { isActive });
            return !!updated.matchedCount;
        } catch (_) {
            throw new BadRequestException('UserActive change error');
        }
    }

    async getByLogin (login: string): Promise<UserActive> {
        try {
            return await this.userActiveModel.findOne({ login });
        }
        catch (_) {
            throw new NotFoundException('UserActive not found');
        }
    }

    async delete (login: string): Promise<boolean> {
        try {
            const deleted: DeleteResult = await this.userActiveModel.deleteOne({ login });
            return !!deleted.deletedCount;
        } catch (_) {
            throw new BadRequestException('UserActive delete error');
        }
    }
}