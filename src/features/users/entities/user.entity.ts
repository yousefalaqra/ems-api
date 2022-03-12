import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, ManyToMany, JoinTable, UpdateDateColumn } from 'typeorm';
import * as uuid from "uuid";
import { RoleEntity } from 'src/features/roles/entities/role.entity';
import { TeamEntity } from 'src/features/teams/entities/team.entity';
@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: uuid.v4()})
  userId: string;
  
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;

  @Column({default: 0})
  status: number;

  @Column()
  confirmationCode: string;

  @Column()
  @CreateDateColumn()
  crtDate: Date;

  @Column()
  @UpdateDateColumn()
  updDate: Date;

  @ManyToMany(()=>RoleEntity)
  @JoinTable()
  userRoles:RoleEntity[]

  @ManyToMany(()=>TeamEntity)
  @JoinTable()
  userTeams:TeamEntity[]

}