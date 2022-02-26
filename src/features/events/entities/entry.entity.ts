import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EventEntity } from './event.entity';
@Entity()
export class EntryEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
  street: string;

  @Column()
  apt: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column({ default: false })
  isSubscribed: boolean;

  @Column()
  registrationDate: Date;

  @ManyToOne(() => EventEntity, event => event.entries, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
    event: EventEntity;
}
