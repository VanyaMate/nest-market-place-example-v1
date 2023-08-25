import { Controller } from '@nestjs/common';
import { UsersOnlineService } from './users-online.service';


@Controller('/api/v1/users-online')
export class UsersOnlineController {

    constructor (private readonly usersOnlineService: UsersOnlineService) {
    }

    update () {
        return this.usersOnlineService.update('');
    }

}