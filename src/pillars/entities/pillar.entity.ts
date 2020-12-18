import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "../../cards/entities/card.entity";
import { Desk } from "../../desks/entities/desk.entity";

@Entity()
export class Pillar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Desk, desk => desk.pillars)
  desk: Desk;

  @ManyToOne(() => User, user => user.ownedPillars, {
    onDelete: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  author: User;

  @OneToMany(() => Card, card => card.pillar)
  cards: Card[];
}
