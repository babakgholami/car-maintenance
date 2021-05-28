import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Repair } from './repair.entity';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class RepairService {
    constructor(
        @Inject(REQUEST)
        private readonly request,
        @InjectRepository(Repair)
        private readonly repairRepository: Repository<Repair>,
    ) {}   

    async bookRepair(repair: Repair): Promise<Repair> {
        return await this.repairRepository.save({
            ... repair,
            user: this.request.user,
        });
    }
}
