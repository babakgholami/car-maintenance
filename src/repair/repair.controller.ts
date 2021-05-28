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
import { RepairService } from './repair.service';
import { Repair } from './repair.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('repair')
@UseGuards(AuthGuard('jwt'))
export class RepairController {
    constructor(private readonly repairService: RepairService) {}

    @Post()
    async bookRepair(@Body() repair: Repair) {
        if (!repair || !repair.vehicle || !repair.user) {
          throw new BadRequestException(`Book a repair must have at least user ID and vehicle defined`);
        }
        return await this.repairService.bookRepair(repair);
    }
}
