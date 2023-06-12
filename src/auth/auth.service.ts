import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ access_token: string }> {
    const { name, email, password, gender } = signUpDto;

    const hashedPassword = await hash(password, 10);

    const user = await this.userModel.create({
      email,
      name,
      gender,
      password: hashedPassword,
    });

    const access_token = this.jwtService.sign({ id: user._id });

    return { access_token };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatches = await compare(password, user.password);

    if (!isPasswordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const access_token = this.jwtService.sign({ id: user._id });

    return { access_token };
  }
}
