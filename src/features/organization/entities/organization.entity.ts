import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { IndustryEntity } from '../../industry/entities/industry.entity';
import { TeamEntity } from '../../teams/entities/team.entity';
import * as uuid from "uuid";
@Entity()
export class OrganizationEntity {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: uuid.v4()})
    organizationId: string;

    @Column()
    name: string;

    @Column()
    numberOfEmeployees: number;

    @OneToMany(() => IndustryEntity, industry => industry.organization)
    industries: IndustryEntity[];

    @OneToMany(() => TeamEntity, team => team.organization)
    teams: TeamEntity[];
    
}
