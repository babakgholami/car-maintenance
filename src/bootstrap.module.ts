import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { RepairModule } from './repair/repair.module';

@Module({
    imports: [
        VehicleModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: process.env.MONGODB_CONNECTION_STRING,
            database: process.env.MONGODB_DATABASE,
            entities: [
                __dirname + '/**/*.entity{.ts,.js}',
            ],
            ssl: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        }),
        AuthModule,
        MailModule,
        RepairModule,
    ],
})
export class BootstrapModule {}