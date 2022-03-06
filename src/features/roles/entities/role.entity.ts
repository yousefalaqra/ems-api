import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import {UserRoleEntity} from '../../userRole/entities/userRole.entity';
@Entity()
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleId: string;

    @Column()
    roleName: string;

    @OneToMany(() => UserRoleEntity, userRole => userRole.role)
    userRoles: UserRoleEntity[];

}
