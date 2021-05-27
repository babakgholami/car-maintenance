import { 
    Controller, 
    Post, 
    Body, 
    BadRequestException 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return await this.authService.login(email, password);
    }

    @Post('register')
    async register( @Body() user: User ) {
        if (!user || !user.email || !user.password) { 
            throw new BadRequestException(`A user must have at least email and password defined`);
        }
        
        return await this.authService.register(user);
    }
}
