import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegisterDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  success = '';
  message = '';
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO) {
    try {
      const data = this.userRepo.create(credentials);
      await data.save();
      const payload = { username: data.username };
      const token = this.jwtService.sign(payload);
      this.success = 'success';
      this.message = 'user registered'
      return {   ...data.toJSON(), token } ;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      this.success= 'unsucces'
      this.message = 'user not registered'
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDTO) {
    try {
      const data = await this.userRepo.findOne({ where: { email } });
      const isValid = await data.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { username: data.username };
      const token = this.jwtService.sign(payload);
      this.success = 'success';
      this.message = 'user logged in'
      return { ...data.toJSON(), token };
    } catch (err) {
      const data : string[] = []
      this.success= 'unsucces'
      this.message = 'Invalid credentials'
      return {...data}
      //throw new UnauthorizedException('Invalid credentials');
    }
  }
}
