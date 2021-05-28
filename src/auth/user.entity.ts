import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany 
} from 'typeorm';

// import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number;
    @Column() email: string;
    @Column() password: string;
    @Column() firstName: string;
    @Column() lastName: string;
    @Column() userGroup: string;
    @Column() activationCode: string;
    @Column() activateTime: Date;
    @CreateDateColumn() createTime: Date;
    @UpdateDateColumn() updateTime: Date;
}
