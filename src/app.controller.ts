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
        console.log('All the input fields needs to be flled');
        throw new Error('All fields must be flled');
      } else {
        const user = await this.authService.registerUser(CreateUserDto);
        if (!user) {
          throw new Error('The user was not created successfully');
        }
        // if the user was created successfully Automatically log in the new user
        req.logIn(user, (err) => {
          if (err) {
            throw new Error('An error Occurred');
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
    if (!req.user) {
      console.log('the user was not logged in successfully');
    }
    return req.user;
    // return this.authService.login(loginuser);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('check-session')
  checkSession(@Request() req, @Response() res) {
    console.log('requestoin user');
    if (req.user) {
      return res.status(200).send({ isAuthenticated: true, user: req.user });
    } else {
      return res.status(200).send({ isAuthenticated: false });
    }
  }

  // Route to Log out a user that is already logged in
  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Request() req, @Response() res) {
    req.logout((err) => {
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
