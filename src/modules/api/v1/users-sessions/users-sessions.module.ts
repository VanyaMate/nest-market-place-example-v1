import { Module } from '@nestjs/common';
import { UsersSessionsService } from './users-sessions.service';
import { UsersSessionsController } from './users-sessions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSession, UserSessionSchema } from './models/user-session.model';


@Module({
    providers  : [ UsersSessionsService ],
    controllers: [ UsersSessionsController ],
    exports    : [ UsersSessionsService ],
    imports    : [
        MongooseModule.forFeature([
            {
                name: UserSession.name, schema: UserSessionSchema,
            },
        ]),
    ],
})
export class UsersSessionsModule {
}