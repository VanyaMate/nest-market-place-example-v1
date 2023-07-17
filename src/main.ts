import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap () {
    const app: INestApplication = await NestFactory.create(
        AppModule,
        {
            cors: {
                origin     : (origin, callback) => {
                    callback(null, origin);
                },
                credentials: true,
            },
        });

    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const port: string                 = configService.get<string>('port');

    app.use(cookieParser());
    await app.listen(port, () => console.log(`server started on: ${ port }`));
}

bootstrap();