import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import {UserRoleEntity} from '../../userRole/entities/userRole.entity';
import { UserTeamEntity } from '../../userTeam/entities/userTeam.entity';
import * as uuid from "uuid";
import * as bcrypt from "bcrypt";
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

  @OneToMany(() => UserTeamEntity, userTeam => userTeam.user)
  userTeams: UserTeamEntity[];
  
  @BeforeInsert()
  async hashPassword() {
    let salt = await bcrypt.genSalt();
    this.passwordHash = await bcrypt.hash(this.passwordHash,salt );
    this.passwordSalt = salt;
  }
}