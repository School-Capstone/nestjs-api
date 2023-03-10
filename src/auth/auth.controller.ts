import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // <-- This is the global route prefix ('/auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register() {
    return this.authService.register();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
