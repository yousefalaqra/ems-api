import {Entity,PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {UserTeamEntity} from '../../userTeam/entities/userTeam.entity';

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


}