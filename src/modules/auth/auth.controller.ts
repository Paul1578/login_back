import { Body, Controller, Post } from "@nestjs/common";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('register')
    registerUser(@Body()userObj: RegisterAuthDto){
        return this.authService.register(userObj);
    }

    @Post('login')
    login(@Body() credenciales: LoginAuthDto){
        return this.authService.login(credenciales)
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<any> {
        return this.authService.forgotPassword(forgotPasswordDto);
  }
}