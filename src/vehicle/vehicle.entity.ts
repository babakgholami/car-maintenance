import { 
    Entity, 
    ObjectID, 
    ObjectIdColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity('vehicle')
export class Vehicle {
  @ObjectIdColumn() id: ObjectID;
  @ManyToOne(() => User) user: User;
  @Column({ length: 10 }) numberPlate: string;
  @Column() lastMileage: number;
  @Column({ length: 25 }) phoneNumber: string;
  @Column({ default: true}) status: boolean;
  @CreateDateColumn() createTime: Date;
  @UpdateDateColumn() updateTime: Date;

  constructor(vehicle?: Partial<Vehicle>) {
    Object.assign(this, vehicle);
  }
}