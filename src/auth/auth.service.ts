import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  register() {
    return {
      message: 'I am the register endpoint',
    };
  }
  login() {
    return {
      message: 'I am the login endpoint',
    };
  }
}
