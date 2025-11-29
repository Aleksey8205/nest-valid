import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { jwtConstants } from '../guards/constants';
import { User } from './shcemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async signup(userData: { email: string; password: string; firstName: string; lastName: string }) {
    try {
      const hashedPassword = await hash(userData.password, 10); 
      const user = await this.userModel.create({ ...userData, password: hashedPassword }); 
      
      return user;
    } catch (error) {
      console.error('Error during signup:', error); 
      throw error;
    }
  }

  async signin(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('Пользователь не найден.');

    const match = await compare(password, user.password); 
    if (!match) throw new Error('Пароль неверный.');

    const tokenPayload = {
      id: user.id.toString(),
      email: user.email,
      firstName: user.firstName,
    };

    if (!jwtConstants.secret) {
        throw new Error('Секретный ключ JWT не установлен.');
      }

    const accessToken = sign(tokenPayload, jwtConstants.secret, { expiresIn: '1h' }); 

    return { access_token: accessToken };
  }
}