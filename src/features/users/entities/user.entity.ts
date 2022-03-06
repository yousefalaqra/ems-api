import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, OneToMany } from 'typeorm';
import {UserRoleEntity} from '../../userRole/entities/userRole.entity';
@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;
  
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  passwordSalt: string;

  @Column()
  @CreateDateColumn()
  crtDate: Date;

  @Column()
  updDate: Date;

  @OneToMany(() => UserRoleEntity, userRole => userRole.user)
  userRoles: UserRoleEntity[];

}