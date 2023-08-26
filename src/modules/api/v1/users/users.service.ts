import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/modules/api/v1/user/models/user.model';
import { Model } from 'mongoose';
import { UserRegistrationDto } from '../auth/dto/user-registration.dto';
import { DeleteResult } from 'mongodb';
import { DUPLICATED_DATA } from '@/consts/error.conts';


@Injectable()
export class UsersService {

    constructor (@InjectModel(User.name) private readonly userModel: Model<User>) {
    }

    async create (creationDto: UserRegistrationDto): Promise<User> {
        try {
            const userDocument: UserDocument = await this.userModel.create({ ...creationDto });
            return userDocument.toObject();
        } catch (_) {
            throw new BadRequestException(DUPLICATED_DATA);
        }
    }

    async getByLogin (login: string): Promise<User> {
        const userDocument: UserDocument = await this.userModel.findOne({ login });
        if (userDocument) {
            return userDocument.toObject();
        }

        return null;
    }

    async delete (login: string): Promise<boolean> {
        const deleted: DeleteResult = await this.userModel.deleteOne({ login });
        return !!deleted.deletedCount;
    }

}