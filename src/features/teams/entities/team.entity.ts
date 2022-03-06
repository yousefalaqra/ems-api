import {Entity,PrimaryGeneratedColumn, Column, OneToMany,ManyToOne} from 'typeorm';
import {UserTeamEntity} from '../../userTeam/entities/userTeam.entity';
import {OrganizationEntity} from '../../organization/entities/organization.entity';

@Entity()
export class TeamEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teamId: string;

    @Column()
    teamName: string;

    @OneToMany(() => UserTeamEntity, userTeam => userTeam.team)
    userTeams: UserTeamEntity[];

    @ManyToOne(() => OrganizationEntity, organization => organization.teams)
    organization: OrganizationEntity;
    
}