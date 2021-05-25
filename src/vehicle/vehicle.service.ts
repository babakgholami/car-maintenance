import { Vehicle } from './vehicle.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VehicleService {
    //FIXME: change to db   
    private storage: Vehicle[] = [];
    private lastId = 1;

    getVehicle(id: number): Vehicle {
        const vehicle = this.storage.find(t => t.id === id);
        if(!vehicle) {
            throw new Error('Not Found');
        }

        return vehicle;
    }

    getVehicles(): Vehicle[]  {
        return this.storage;
    }

    createVehicle(vehicle: Vehicle) {
        vehicle.id = this.lastId++;
        this.storage.push(vehicle);
    }
    
    updateVehicle(id: number,vehicle: Vehicle) {
        const vehicleIndex = this.storage.findIndex(t => t.id === id);  //vehicle.id
        this.storage[vehicleIndex] = vehicle;
    }

    deleteVehicle(id: number) {
        const vehicleIndex = this.storage.findIndex(t => t.id === id);
        this.storage.splice(vehicleIndex, 1);
    }
}