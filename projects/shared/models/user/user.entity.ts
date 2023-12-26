import { ID } from '@nestjs/graphql';
import { DateTimeISOResolver } from 'graphql-scalars';
import {
  Column,
  CreateDateColumn,
  Entity,
  Field,
  ObjectType,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'nestjs-graphql-easy';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => DateTimeISOResolver, { nullable: false, sortable: true, filterable: true })
  @CreateDateColumn({
    type: 'timestamp without time zone',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @Field(() => DateTimeISOResolver, { nullable: false, sortable: true, filterable: true })
  @UpdateDateColumn({
    type: 'timestamp without time zone',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  @Field(() => String, { nullable: false, sortable: true, filterable: true })
  @Column('character varying', { nullable: false })
  public full_name: string;
}
