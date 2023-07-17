import { Module } from '@nestjs/common';
import { UsersModule } from './api/v1/users/users.module';
import {
    UsersSessionsModule,
} from './api/v1/users-sessions/users-sessions.module';
import { UsersTokensModule } from './api/v1/users-tokens/users-tokens.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { UsersActiveModule } from './api/v1/users-active/users-active.module';


@Module({
    imports: [
        UsersModule,
        UsersSessionsModule,
        UsersTokensModule,
        UsersActiveModule,
        AuthModule,
    ],
})
export class ApiV1Module {
}