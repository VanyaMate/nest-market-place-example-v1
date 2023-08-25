import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { MONGO_DB_URL } from '../../../consts/.const';
import { DATABASE } from './database.const';


export const databaseProviders = [
    {
        provide   : DATABASE,
        useFactory: async (config: ConfigService) => {
            await mongoose.connect(config.get<string>(MONGO_DB_URL));
        },
        inject    : [ ConfigService ],
    },
];