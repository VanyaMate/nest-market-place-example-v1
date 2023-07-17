import { IsString, Length } from 'class-validator';
import {
    CV_IS_NOT_STRING,
    CV_NO_VALID_LENGTH,
} from '../../../../../consts/error.conts';


export class UserLoginDto {

    @IsString({ message: CV_IS_NOT_STRING })
    @Length(3, 15, { message: CV_NO_VALID_LENGTH })
    login: string;

    @IsString({ message: CV_IS_NOT_STRING })
    @Length(6, 30, { message: CV_NO_VALID_LENGTH })
    password: string;

}