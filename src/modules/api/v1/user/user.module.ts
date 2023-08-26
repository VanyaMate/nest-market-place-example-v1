import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/modules/api/v1/user/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { UserMapper } from './user.mapper';
import { UsersTokensModule } from '../users-tokens/users-tokens.module';
import { UsersSessionsModule } from '../users-sessions/users-sessions.module';


@Module({
    controllers: [ UserController ],
    providers  : [ UserService, UserMapper ],
    imports    : [
        MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]),
        forwardRef(() => AuthModule),
        UsersSessionsModule,
        UsersTokensModule,
    ],
    exports    : [ UserMapper ],
})
export class UserModule {
}