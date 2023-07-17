import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UserToken } from './models/user-token.model';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET_KEY } from '../../../../consts/.const';
import { JwtPayload } from 'jsonwebtoken';


@Injectable()
export class UsersTokensService {

    constructor (private readonly configService: ConfigService) {
    }

    async create (login: string, sessionKey: string): Promise<string> {
        return jwt.sign({
            login, sessionKey,
        }, this._getSecretOrPublicKey(), {
            expiresIn: '7d',
        });
    }

    async refresh (token: string): Promise<string> {
        const decoded: UserToken | false = await this.validate(token);
        return await this.create(decoded.login, decoded.session);
    }

    async validate (token: string): Promise<UserToken> {
        const verified: string | JwtPayload = jwt.verify(token, this._getSecretOrPublicKey());
        if (verified) {
            return jwt.decode(token) as UserToken;
        } else {
            throw new UnauthorizedException('No valid token');
        }
    }

    private _getSecretOrPublicKey () {
        return this.configService.get<string>(JWT_SECRET_KEY);
    }

}