import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { IndustryEntity } from '../../industry/entities/industry.entity';
import { TeamEntity } from '../../teams/entities/team.entity';
@Entity()
export class OrganizationEntity {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationId: string;

    @Column()
    name: string;

    @OneToMany(() => IndustryEntity, industry => industry.organization)
    industries: IndustryEntity[];

    @OneToMany(() => TeamEntity, team => team.organization)
    teams: TeamEntity[];
    
}
