import { Controller, Patch, UseGuards } from '@nestjs/common';
import { UsersOnlineService } from './users-online.service';
import { AccessTokenGuard } from '@/guards/access-token.guard';
import {
    IUserVerifiedData,
    UserVerified,
} from '@/decorators/user-verified.decorator';


@Controller('/api/v1/users-online')
export class UsersOnlineController {

    constructor (private readonly usersOnlineService: UsersOnlineService) {
    }


    @UseGuards(AccessTokenGuard)
    @Patch()
    update (@UserVerified() userVerifiedData: IUserVerifiedData) {
        return this.usersOnlineService.update(userVerifiedData.login);
    }

}