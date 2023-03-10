import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // <-- This is the global route prefix ('/auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register() {
    return {
      message: 'I am the register endpoint', // <-- Nest will automatically convert this to JSON
    };
  }

  @Post('login')
  login() {
    return 'I am the login endpoint'; // <-- Nest will automatically convert this to text
  }
}
