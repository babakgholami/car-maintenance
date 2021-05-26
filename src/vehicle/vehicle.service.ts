import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
    ) {}   

    async getVehicle(id: number): Promise<Vehicle> {
        return await this.vehicleRepository.findOneOrFail(id);
    }

    async getVehicles(): Promise<Vehicle[]>  {
        return await this.vehicleRepository.find();
    }

    async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
        return await this.vehicleRepository.save(vehicle);
    }
    
    async updateVehicle(id: number,vehicle: Vehicle): Promise<Vehicle> {
        const oldVehicle = await this.vehicleRepository.findOneOrFail(id);
        const newVehicle = { ... oldVehicle, ... vehicle};

        return await this.vehicleRepository.save(newVehicle);
    }

    async deleteVehicle(id: number): Promise<boolean> {
        await this.vehicleRepository.delete(id);
        return true;
    }
}