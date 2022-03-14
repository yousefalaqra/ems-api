import {Entity,PrimaryGeneratedColumn, Column,ManyToOne} from 'typeorm';
import {OrganizationEntity} from '../../organization/entities/organization.entity';
import * as uuid from "uuid";
@Entity()
export class TeamEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: uuid.v4()})
    teamId: string;

    @Column()
    teamName: string;

    @ManyToOne(() => OrganizationEntity, organization => organization.teams)
    organization: OrganizationEntity;
    
}