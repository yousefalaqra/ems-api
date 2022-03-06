import { EventType } from "../entities/virtualEvent.entity";

export class VirtualEventModel {
    virtual_id: number;

    src: string;

    type: EventType;

    event_id: number;
}