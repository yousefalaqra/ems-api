import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, OneToMany, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import * as uuid from "uuid";
import * as bcrypt from "bcrypt";
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
  passwordHash: string;

  @Column()
  passwordSalt: string;

  @Column()
  @CreateDateColumn()
  crtDate: Date;

  @Column()
  updDate: Date;



  @ManyToMany(()=>RoleEntity)
  @JoinTable()
  userRoles:RoleEntity[]

  @ManyToMany(()=>TeamEntity)
  @JoinTable()
  userTeams:TeamEntity[]

  @BeforeInsert()
  async hashPassword() {
    let salt = await bcrypt.genSalt();
    this.passwordHash = await bcrypt.hash(this.passwordHash,salt );
    this.passwordSalt = salt;
  }
}