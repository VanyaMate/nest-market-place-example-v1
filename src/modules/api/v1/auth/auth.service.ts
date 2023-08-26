import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UsersService } from '../users/users.service';
import { UsersActiveService } from '../users-active/users-active.service';
import { UsersSessionsService } from '../users-sessions/users-sessions.service';
import { UsersTokensService } from '../users-tokens/users-tokens.service';
import { User } from '@/modules/api/v1/user/models/user.model';
import { Response } from 'express';
import { BROWZER_ACCESS_TOKEN } from '../../../../consts/.const';
import { getMsDays } from '../../../../helpers/utils';
import { UserActive } from '../users-active/models/user-active.model';
import { UserLoginDto } from './dto/user-login.dto';
import { UserAuth } from '../user/user.interface';
import { CryptService } from '../crypt/crypt.service';


@Injectable()
export class AuthService {

    constructor (private readonly usersService: UsersService,
                 private readonly usersActiveService: UsersActiveService,
                 private readonly usersSessionsService: UsersSessionsService,
                 private readonly usersTokensService: UsersTokensService,
                 private readonly cryptService: CryptService) {
    }

    async registration (registrationDto: UserRegistrationDto): Promise<UserAuth> {
        const hash: string                = this.cryptService.encrypt(registrationDto.password);
        const regDto: UserRegistrationDto = {
            ...registrationDto, password: hash,
        };
        /**
         * TODO: Возможно это стоит перенести в pre('save')?
         */
        const user: User                  = await this.usersService.create(regDto);
        const active: UserActive          = await this.usersActiveService.create(user.login, false);
        const session: string             = await this.usersSessionsService.create(user.login);
        const jwt: string                 = await this.usersTokensService.create(user.login, session);

        return [ user, jwt ];
    }

    async login (loginDto: UserLoginDto): Promise<UserAuth> {
        const user: User = await this.usersService.getByLogin(loginDto.login);
        if (!user) throw new UnauthorizedException('No valid data');
        const compared: boolean = this.cryptService.compare(loginDto.password, user.password);

        if (compared) {
            const session: string = await this.usersSessionsService.getByLogin(loginDto.login);
            const jwt: string     = await this.usersTokensService.create(user.login, session);

            return [ user, jwt ];
        }

        throw new UnauthorizedException('No valid data');
    }

    async logout (response: Response): Promise<boolean> {
        response.clearCookie(BROWZER_ACCESS_TOKEN);
        return true;
    }

    async setJwtCookie (response: Response, jwt: string): Promise<void> {
        response.cookie(BROWZER_ACCESS_TOKEN, jwt, {
            httpOnly: true,
            maxAge  : getMsDays(7),
        });
    }

}