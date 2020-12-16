import { Card } from "src/cards/entities/card.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Pillar {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.pillars, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  author: User;

  @OneToMany(() => Card, card => card.pillar)
  cards: Card[]

}