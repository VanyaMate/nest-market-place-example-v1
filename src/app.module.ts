import { Module } from '@nestjs/common';
import { ApiV1Module } from './modules/api-v1.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_DB_URL } from './consts/.const';


@Module({
    imports    : [
        ApiV1Module,
        ConfigModule.forRoot({
            envFilePath: `.${ process.env.NODE_ENV }.env`,
            isGlobal   : true,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '..', 'public'),
        }),
        MongooseModule.forRootAsync({
            imports   : [ ConfigModule ],
            useFactory: async (config: ConfigService) => ({
                uri: config.get<string>(MONGO_DB_URL),
            }),
            inject    : [ ConfigService ],
        }),
    ],
    controllers: [],
    providers  : [],
})
export class AppModule {
}