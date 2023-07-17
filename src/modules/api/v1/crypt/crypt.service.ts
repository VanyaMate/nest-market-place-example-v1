import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CryptService {

    encrypt (str: string): string {
        return bcrypt.hashSync(str, 2);
    }

    compare (str: string, hash: string): boolean {
        return bcrypt.compareSync(str, hash);
    }

}