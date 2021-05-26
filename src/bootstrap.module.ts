import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';

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
    ],
})
export class BootstrapModule {}