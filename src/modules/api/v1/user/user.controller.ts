import { Body, Controller, Patch, Res } from '@nestjs/common';
import { SetData } from '../.interfaces';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { UserAuth } from './user.interface';


@Controller('/api/v1/user')
export class UserController {

    constructor (private readonly userService: UserService,
                 private readonly authService: AuthService) {
    }

    @Patch('/login')
    async setLogin (@Body() data: SetData<string>,
                    @Res({ passthrough: true }) response: Response): Promise<boolean> {
        const [ user, jwt ]: UserAuth = await this.userService.setLogin('login', data.value);
        await this.authService.setJwtCookie(response, jwt);
        return true;
    }

    @Patch('/email')
    setEmail (@Body() data: SetData<string>) {
        return this.userService.setEmail('login', data.value);
    }

    @Patch('/password')
    async setPassword (@Body() data: SetData<string>,
                       @Res({ passthrough: true }) response: Response) {
        const [ user, jwt ]: UserAuth = await this.userService.setPassword('login', data.value);
        await this.authService.setJwtCookie(response, jwt);
        return true;
    }

}