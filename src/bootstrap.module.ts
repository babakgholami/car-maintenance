import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        VehicleModule,
        ConfigModule.forRoot(),
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
    ],
})
export class BootstrapModule {}