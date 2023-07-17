import { Module } from '@nestjs/common';
import { UsersTokensService } from './users-tokens.service';
import { UsersTokensController } from './users-tokens.controller';


@Module({
    providers  : [ UsersTokensService ],
    controllers: [ UsersTokensController ],
    exports    : [ UsersTokensService ],
    imports    : [],
})
export class UsersTokensModule {
}