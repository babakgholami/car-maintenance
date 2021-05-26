import { 
    Entity, 
    ObjectID, 
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('vehicle')
export class Vehicle {
  @ObjectIdColumn() id: ObjectID;
  @Column() userId: number;
  @Column({ length: 10 }) numberPlate: string;
  @Column() lastMileage: number;
  @Column({ length: 64 }) owner: string;
  @Column({ length: 25 }) phoneNumber: string;
  @Column({ default: true}) status: boolean;
  @CreateDateColumn() createTime: Date;
  @UpdateDateColumn() updateTime: Date;

  constructor(vehicle?: Partial<Vehicle>) {
    Object.assign(this, vehicle);
  }
}