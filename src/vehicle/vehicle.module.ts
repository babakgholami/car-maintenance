import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from './vehicle.service';
import { VehicleController} from './vehicle.controller';
import { Vehicle } from './vehicle.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Vehicle,
        ]),
    ],
    controllers: [
        VehicleController,
    ],
    providers: [
        VehicleService,
    ]
})
export class VehicleModule {}
