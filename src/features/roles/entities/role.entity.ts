import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import * as uuid from "uuid";
@Entity()
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: uuid.v4()})
    roleId: string;

    @Column()
    roleName: string;


}
