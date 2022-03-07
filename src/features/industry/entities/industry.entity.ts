import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import {OrganizationEntity} from '../../organization/entities/organization.entity';
import * as uuid from "uuid";
@Entity()
export class IndustryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: uuid.v4()})
    industryId: string;
    
    @Column()
    name: string;

    @ManyToOne(()=> OrganizationEntity, organization => organization.industries)
    organization: OrganizationEntity;

}