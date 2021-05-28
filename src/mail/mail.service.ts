import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../auth/user.entity';

@Injectable()
export class MailService {
    constructor(private MailerService: MailerService) {};

    async sendUserConfirmation(user: User, token: string) {
        const url = 'http://localhost:3000/auth/confirm?token=${token}';

        await this.MailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Car Maintenance App! Confirm your email',
            template: './confirmation',
            context: {
                firstName: user.firstName,
                url,
            },
        });
    }
}
