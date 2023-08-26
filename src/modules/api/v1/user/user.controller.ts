import {
    Body,
    Controller,
    Delete,
    Patch,
    Res,
    UseGuards,
} from '@nestjs/common';
import { SetData } from '../.interfaces';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { UserAuth } from './user.interface';
import { AccessTokenGuard } from '@/guards/access-token.guard';
import {
    IUserVerifiedData,
    UserVerified,
} from '@/decorators/user-verified.decorator';


@Controller('/api/v1/user')
export class UserController {

    constructor (private readonly userService: UserService,
                 private readonly authService: AuthService) {
    }

    @Patch('/login')
    @UseGuards(AccessTokenGuard)
    async setLogin (@Body() data: SetData<string>,
                    @Res({ passthrough: true }) response: Response,
                    @UserVerified() userVerifiedData: IUserVerifiedData): Promise<boolean> {
        const [ user, jwt ]: UserAuth = await this.userService.setLogin(userVerifiedData.login, data.value);
        await this.authService.setJwtCookie(response, jwt);
        return true;
    }

    @Patch('/email')
    @UseGuards(AccessTokenGuard)
    setEmail (@Body() data: SetData<string>,
              @UserVerified() userVerifiedData: IUserVerifiedData) {
        return this.userService.setEmail(userVerifiedData.login, data.value);
    }

    @Patch('/password')
    @UseGuards(AccessTokenGuard)
    async setPassword (@Body() data: SetData<string>,
                       @Res({ passthrough: true }) response: Response,
                       @UserVerified() userVerifiedData: IUserVerifiedData) {
        const [ user, jwt ]: UserAuth = await this.userService.setPassword(userVerifiedData.login, data.value);
        await this.authService.setJwtCookie(response, jwt);
        return true;
    }

    @Delete()
    @UseGuards(AccessTokenGuard)
    async delete (@Res({ passthrough: true }) response: Response,
                  @UserVerified() userVerifiedData: IUserVerifiedData) {
        return this.userService.delete(userVerifiedData.login);
    }

}