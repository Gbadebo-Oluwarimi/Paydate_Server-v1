import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Body,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guards';
import { CreateUserDto } from './User/User.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Post('Signup')
  async Signup(@Body() CreateUserDto, @Request() req, @Response() res) {
    try {
      // Resgister the new User
      if (
        !CreateUserDto ||
        !CreateUserDto.username ||
        !CreateUserDto.password ||
        !CreateUserDto.companyName ||
        !CreateUserDto.email
      ) {
        console.log('All the input fields needs to be filled');
        return res.send({ message: 'Please input all the field' });
      } else {
        const user = await this.authService.registerUser(CreateUserDto);

        // Automatically log in the new user
        req.logIn(user, (err) => {
          if (err) {
            return res
              .status(500)
              .send({ message: 'Failed to log in after sign-up' });
          }
          return res.status(201).send(user);
        });
      }
    } catch (err) {
      return res
        .status(500)
        .send({ message: 'Sign-up failed', error: err.message });
    }
  }
  //With @UseGuards(AuthGuard('local')) we are using an AuthGuard that @nestjs/passportautomatically provisioned for us when we extended the passport-local strategy. Let's break that down. Our Passport local strategy has a default name of 'local'

  @UseGuards(LocalAuthGuard) // This will run before going to the login section
  @Post('auth/login')
  async login(@Request() req) {
    console.log('ran', req.session);
    return req.user;
    // return this.authService.login(loginuser);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // Route to Log out a user that is already logged in
  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Request() req, @Response() res) {
    req.logout((err: any) => {
      if (err) {
        return res.status(500).send({ message: 'Failed to logout' });
      }
      req.session.destroy((err: any) => {
        if (err) {
          return res.status(500).send({ message: 'Failed to destroy session' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        return res.status(200).send({ message: 'Logged out successfully' });
      });
    });
  }
}
