import { 
    Injectable, 
    UnauthorizedException,
    ConflictException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { sha512 } from 'hash.js';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { join } from 'path';

@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private mailService: MailService,
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

    async confirm(email: string, token: string) {
        const user = await this.userRepository.findOne({ 'email': email, 'activationCode': token });
        if(!user) {
            throw new HttpException("Your activation code is not valid, try again or contact admin", HttpStatus.NOT_FOUND);        
        }

        //TODO: check it
        return await this.userRepository.update({email: user.email}, {activationCode: '', activateTime: Date()});
    }

    async getUserById(id: number) {
        return await this.userRepository.findOne(id);
    }

    async register(user: User): Promise<User> {
        const userExist = await this.userRepository.findOne({ email: user.email });
        if(userExist) {
            throw new ConflictException('User already exist');
        }

        let activationCode = Math.random().toString(36).substring(2);

        user.password = sha512().update(user.password).digest('hex');


        let result = await this.userRepository.save({
            ... user,
            activationCode: activationCode,
            group: "Trial",
        });

        //TODO: try with valid smpt email
        // if(result) {
        //     await this.mailService.sendUserConfirmation(user, activationCode);
        // }

        return result;
    }




}
