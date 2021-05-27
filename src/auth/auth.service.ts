import { 
    Injectable, 
    UnauthorizedException,
    ConflictException
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { sha512 } from 'hash.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ email });
        if(!user) {
            throw new UnauthorizedException();
        }

        const passwordHash = sha512().update(password).digest('hex');
        if(user.password !== passwordHash) {
            throw new UnauthorizedException();
        }

        const token = await this.jwtService.signAsync(
            {id: user.id},
            {expiresIn: 3600*24},
        );

        return {
            token,
        };
    }

    async getUserById(id: number) {
        return await this.userRepository.findOne(id);
    }

    async register(user: User): Promise<User> {
        const userExist = await this.userRepository.findOne({ email: user.email });
        if(userExist) {
            throw new ConflictException('User already exist');
        }

        user.password = sha512().update(user.password).digest('hex');

        return await this.userRepository.save({
            ... user,
            group: "Quest",
        });
    }
}
