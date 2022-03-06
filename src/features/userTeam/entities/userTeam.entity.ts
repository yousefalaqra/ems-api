import {Entity,JoinColumn, Column, ManyToOne, PrimaryColumn} from 'typeorm';
import { TeamEntity } from '../../teams/entities/team.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity()
export class UserTeamEntity {

    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    teamId: string;

    @ManyToOne(() => UserEntity, user => user.userTeams, {primary: true})
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
    
    @ManyToOne(() => TeamEntity, team => team.userTeams, {primary: true})
    @JoinColumn({ name: 'teamId' })
    team: TeamEntity;

    
    


}