import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntryEntity } from './entry.entity';
@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: false })
  isMain: boolean;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ default: null })
  startTime: Date;

  @Column({ default: null })
  endTime: Date;

  @Column({ default: '' })
  src: string;

  @Column({ default: '' })
  img: string;

  @Column({ default: '' })
  livePageUrl: string;

  @OneToMany(() => EntryEntity, (entry) => entry.event)
  entries: Array<EntryEntity>;
}
