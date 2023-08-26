import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSession } from './models/user-session.model';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { DeleteResult } from 'mongodb';


@Injectable()
export class UsersSessionsService {

    constructor (@InjectModel(UserSession.name) private readonly userSessionModel: Model<UserSession>) {
    }

    async create (login: string): Promise<string> {
        try {
            const session: string = this._generateSessionKey();
            await this.userSessionModel.create({ login, session });
            return session;
        } catch (_) {
            throw new BadRequestException('UserSession creation error');
        }
    }

    async refresh (login: string): Promise<string> {
        try {
            const session: string = this._generateSessionKey();
            await this.userSessionModel.updateOne({ login }, { session });
            return session;
        } catch (_) {
            throw new BadRequestException('UserSession refresh error');
        }
    }

    async getByLogin (login: string): Promise<string | null> {
        try {
            const userSession: UserSession | null = await this.userSessionModel.findOne({ login });
            if (userSession) {
                return userSession.session;
            } else {
                return null;
            }
        } catch (_) {
            throw new NotFoundException('UserSession not found');
        }
    }

    async delete (login: string): Promise<boolean> {
        try {
            const deleted: DeleteResult = await this.userSessionModel.deleteOne({ login });
            return !!deleted.deletedCount;
        } catch (_) {
            throw new NotFoundException('UserSession not found');
        }
    }

    private _generateSessionKey (): string {
        return v4();
    }


}