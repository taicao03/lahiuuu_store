// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/schemas/user.schema';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { username: string; password: string },
  ): Promise<User> {
    return this.authService.register(body.username, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    return this.authService.login(user);
  }
}
