import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { ClassValidatorPipe } from '../../../../pipes/class-validator.pipe';
import { AccessTokenGuard } from '../../../../guards/access-token.guard';


@Controller('/api/v1/auth')
export class AuthController {

    constructor (private readonly authService: AuthService) {
    }

    @Post('/registration')
    @UsePipes(ClassValidatorPipe)
    registration (@Body() registrationDto: UserRegistrationDto) {
        return this.authService.registration(registrationDto);
    }

    @Post('/login')
    @UsePipes(ClassValidatorPipe)
    login (@Body() loginDto: UserLoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('/logout')
    @UseGuards(AccessTokenGuard)
    logout (@Res({ passthrough: true }) response: Response) {
        return this.authService.logout(response);
    }

    private _generateToken () {

    }

}