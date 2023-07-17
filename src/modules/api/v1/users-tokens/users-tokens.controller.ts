import { Controller, Patch } from '@nestjs/common';


@Controller('api/v1/users-tokens')
export class UsersTokensController {

    @Patch()
    refresh () {
        return 'refresh token';
    }

}