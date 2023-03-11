import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // <-- This is the global route prefix ('/auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    console.log(body);
    return this.authService.register();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
