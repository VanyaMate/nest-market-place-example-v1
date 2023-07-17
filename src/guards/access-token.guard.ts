import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { BROWZER_ACCESS_TOKEN } from '../consts/.const';
import { NO_ACCESS } from '../consts/error.conts';
import {
    UsersTokensService,
} from '../modules/api/v1/users-tokens/users-tokens.service';
import {
    UserToken,
} from '../modules/api/v1/users-tokens/models/user-token.model';
import {
    UsersSessionsService,
} from '../modules/api/v1/users-sessions/users-sessions.service';


@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor (private readonly usersTokensService: UsersTokensService,
                 private readonly usersSessionsService: UsersSessionsService) {
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const req: Request                    = context.switchToHttp().getRequest();
        const accessToken: string | undefined = req.cookies?.[BROWZER_ACCESS_TOKEN];
        if (!accessToken) {
            throw new UnauthorizedException(NO_ACCESS);
        }

        const verified: UserToken = await this.usersTokensService.validate(accessToken);
        if (!verified) {
            throw new UnauthorizedException(NO_ACCESS);
        }

        const { login, session }     = verified;
        const sessionByLogin: string = await this.usersSessionsService.getByLogin(login);
        if (sessionByLogin !== session) {
            throw new UnauthorizedException(NO_ACCESS);
        }

        req[BROWZER_ACCESS_TOKEN] = login;
        return true;
    }
}