import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Put,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('vehicle')
@UseGuards(AuthGuard('jwt'))
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    @Get()
    async getVehicles() {
        return await this.vehicleService.getVehicles();
    }

    @Get(':id')
    async getVehicle(@Param('id') id: number) {
        return await this.vehicleService.getVehicle(id);
    }

    @Post()
    async createVehicle(@Body() vehicle: Vehicle) {
        if (!vehicle || !vehicle.numberPlate) {  // !vehicle.user ||
          throw new BadRequestException(`A vehicle must have at least user ID and numberPlate defined`);
        }
        return await this.vehicleService.createVehicle(vehicle);
    }

    @Put(':id')
    async updateVehicle(@Param('id') id: number, @Body() vehicle: Vehicle) {
        return await this.vehicleService.updateVehicle(id, vehicle);
    }

    //TODO: fix error
    @Delete(':id')
    async deleteVehicle(@Param('id') id: number) {
        return await this.deleteVehicle(id);
    }
}
