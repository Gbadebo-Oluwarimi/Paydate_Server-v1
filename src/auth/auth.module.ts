import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/User/User.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
