import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/models/user.model';
import { Model } from 'mongoose';
import { UsersSessionsService } from '../users-sessions/users-sessions.service';
import { UsersTokensService } from '../users-tokens/users-tokens.service';
import { UserAuth } from './user.interface';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class UserService {

    constructor (@InjectModel(User.name) private readonly userModel: Model<User>,
                 private readonly usersSessionService: UsersSessionsService,
                 private readonly usersTokensService: UsersTokensService) {
    }

    async setLogin (login: string, newLogin: string): Promise<UserAuth> {
        return this._refreshWithToken(login, 'login', newLogin);
    }

    async setEmail (login: string, email: string): Promise<User> {
        return this._updateKey(login, 'email', email);
    }

    async setPassword (login: string, password: string): Promise<UserAuth> {
        return this._refreshWithToken(login, 'password', password);
    }

    private async _refresh (login: string): Promise<string> {
        const session: string = await this.usersSessionService.refresh(login);
        return await this.usersTokensService.create(login, session);
    }

    private async _refreshWithToken (login: string, key: keyof User, value: string): Promise<UserAuth> {
        const user: User  = await this._updateKey(login, key, value);
        const jwt: string = await this._refresh(login);
        return [ user, jwt ];
    }

    private async _updateKey (login: string, key: keyof User, value: string): Promise<User> {
        const user: UserDocument = await this.userModel.findOne({ [key]: value });
        user[key]                = value;
        await user.save();
        return user.toObject();
    }

}