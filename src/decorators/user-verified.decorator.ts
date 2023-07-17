import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BROWZER_ACCESS_TOKEN } from '../consts/.const';


export interface IUserVerifiedData {
    login: string,
}

export const UserVerified = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request                             = ctx.switchToHttp().getRequest();
        const userVerifiedData: IUserVerifiedData = {
            login: request[BROWZER_ACCESS_TOKEN],
        };

        return userVerifiedData;
    },
);