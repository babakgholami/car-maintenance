import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairService } from './repair.service';
import { RepairController} from './repair.controller';
import { Repair } from './repair.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
          Repair,
      ]),
  ],
  controllers: [
      RepairController,
  ],
  providers: [
      RepairService,
  ]
})

export class RepairModule {}
