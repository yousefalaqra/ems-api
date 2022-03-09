import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./event.entity";
import { EventType } from "../enums/event-type.enum";


@Entity()
export class VirtualEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    src: string;

    @Column()
    type: EventType;

    @Column({ default: null })
    eventId: number;

    @OneToOne(() => EventEntity, event => event.virtual)
    event: EventEntity;
}