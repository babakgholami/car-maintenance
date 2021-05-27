import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class VehicleService {
    constructor(
        @Inject(REQUEST)
        private readonly request,
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
    ) {}   

    async getVehicle(id: number): Promise<Vehicle> {
        const vehicle = await this.vehicleRepository.findOneOrFail({
            id,
            user: this.request.user,
        });

        if(!vehicle) {
            throw new NotFoundException;
        }

        return vehicle;
    }

    async getVehicles(): Promise<Vehicle[]>  {
        return await this.vehicleRepository.find({
            user: this.request.user,
        });
    }

    async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
        return await this.vehicleRepository.save({
            ... vehicle,
            user: this.request.user,
        });
    }
    
    async updateVehicle(id: number,vehicle: Vehicle): Promise<Vehicle> {
        const oldVehicle = await this.vehicleRepository.findOneOrFail({
            id,
            user: this.request.user,
        });

        if(!oldVehicle) {
            throw new NotFoundException;
        }

        const newVehicle = {
            ... oldVehicle, 
            ... vehicle
        };

        return await this.vehicleRepository.save(newVehicle);
    }

    async deleteVehicle(id: number): Promise<boolean> {
        await this.vehicleRepository.delete(id);
        
        return true;
    }
}