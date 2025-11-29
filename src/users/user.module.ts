import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UserSchema } from './shcemas/user.schema';
import { jwtConstants } from './constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), 
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register(jwtConstants), 
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}