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
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity('repair')
export class Repair {
  @ObjectIdColumn() id: ObjectID;
  @ManyToOne(() => User) user: User;
  @ManyToOne(() => Vehicle) vehicle: Vehicle;
  @Column() branchId: number;  //TODO: change to Branch Object
  @Column() mileage: number;
  @Column() description: string;
  @Column() status: string;
  @Column() bookDate: Date;
  @Column() repairDate: Date;
  @CreateDateColumn() createTime: Date;
  @UpdateDateColumn() updateTime: Date;

  constructor(repair?: Partial<Repair>) {
    Object.assign(this, repair);
  }
}