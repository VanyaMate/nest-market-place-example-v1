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
import { ClassValidatorPipe } from '@/pipes/class-validator.pipe';
import { AccessTokenGuard } from '@/guards/access-token.guard';
import { User } from '@/modules/api/v1/user/models/user.model';
import { UserMapper } from '../user/user.mapper';


@Controller('/api/v1/auth')
export class AuthController {

    constructor (private readonly authService: AuthService,
                 private readonly userMapper: UserMapper) {
    }

    @Post('/registration')
    @UsePipes(ClassValidatorPipe)
    async registration (@Body() registrationDto: UserRegistrationDto,
                        @Res({ passthrough: true }) response: Response) {
        const [ user, jwt ]: [ User, string ] = await this.authService.registration(registrationDto);
        await this.authService.setJwtCookie(response, jwt);
        return this.userMapper.modelToPrivate(user);
    }

    @Post('/login')
    @UsePipes(ClassValidatorPipe)
    async login (@Body() loginDto: UserLoginDto,
                 @Res({ passthrough: true }) response: Response) {
        const [ user, jwt ]: [ User, string ] = await this.authService.login(loginDto);
        await this.authService.setJwtCookie(response, jwt);
        return this.userMapper.modelToPrivate(user);
    }

    @Get('/logout')
    @UseGuards(AccessTokenGuard)
    logout (@Res({ passthrough: true }) response: Response) {
        return this.authService.logout(response);
    }

}