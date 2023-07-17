import { Module } from '@nestjs/common';
import { UsersActiveService } from './users-active.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserActive, UserActiveSchema } from './models/user-active.model';


@Module({
    providers: [ UsersActiveService ],
    imports  : [
        MongooseModule.forFeature([
            {
                name: UserActive.name, schema: UserActiveSchema,
            },
        ]),
    ],
    exports  : [
        UsersActiveService,
    ],
})
export class UsersActiveModule {
}