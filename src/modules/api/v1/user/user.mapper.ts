import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { UserPrivate, UserPublic } from './user.interface';


@Injectable()
export class UserMapper {

    modelToPrivate (user: User): UserPrivate {
        return {
            login: user.login,
            email: user.email,
        };
    }

    modelToPublic (user: User): UserPublic {
        return {
            login: user.login,
        };
    }

}