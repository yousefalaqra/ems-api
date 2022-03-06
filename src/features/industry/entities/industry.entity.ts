import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import {OrganizationEntity} from '../../organization/entities/organization.entity';
@Entity()
export class IndustryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    industryId: string;
    
    @Column()
    name: string;

    @ManyToOne(()=> OrganizationEntity, organization => organization.industries)
    organization: OrganizationEntity;

}