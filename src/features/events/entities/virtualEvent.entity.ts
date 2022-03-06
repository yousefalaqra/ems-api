import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./event.entity";

export enum EventType {
    zoom
}

@Entity()
export class VirtualEvent {
    @PrimaryGeneratedColumn()
    virtual_id: number;

    @Column()
    src: string;

    @Column()
    type: EventType;

    @Column()
    event_id: number;

    @OneToOne(() => EventEntity, eventRel => eventRel.virtuals)
    eventRel: EventEntity;
}