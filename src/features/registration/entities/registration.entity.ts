import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import * as uuid from "uuid";
@Entity()
export class RegistrationEntity {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: uuid.v4()})
    RegistrationId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    title: string;

    @Column()
    company: string;

    @Column()
    country: string;

    @Column()
    capacity: string;

    @Column()
    isReceiveCommunication: boolean;

    @Column()
    questions: string;

    @Column()
    @CreateDateColumn()
    registeredDate: Date;
  
}