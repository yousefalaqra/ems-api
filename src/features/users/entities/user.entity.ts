import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, OneToMany } from 'typeorm';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  @CreateDateColumn()
  crtDate: Date;

  @Column()
  updDate: Date;
}