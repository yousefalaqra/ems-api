import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RoleEntity } from '../../roles/entities/role.entity';
@Entity()
export class UserRoleEntity {

    @PrimaryColumn()
    userId:number;
    
    @PrimaryColumn()
    roleId:number;


    @ManyToOne(() => UserEntity, user => user.userRoles, {primary: true})
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => RoleEntity, role => role.userRoles, {primary: true})
    @JoinColumn({ name: 'roleId' })
    role: RoleEntity;

}