import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import {UserRoleEntity} from '../../userRole/entities/userRole.entity';
import * as uuid from "uuid";
@Entity()
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: uuid.v4()})
    roleId: string;

    @Column()
    roleName: string;

    @OneToMany(() => UserRoleEntity, userRole => userRole.role)
    userRoles: UserRoleEntity[];

}
