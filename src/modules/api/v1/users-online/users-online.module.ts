import { Module } from '@nestjs/common';
import { UsersOnlineService } from './users-online.service';


@Module({
    providers: [
        UsersOnlineService,
    ],
    exports  : [
        UsersOnlineService,
    ],
    imports  : [],
})
export class UsersOnlineModule {
}