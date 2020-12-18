import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "src/cards/entities/card.entity";

@Entity()
export class Pillar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.ownedPillars, {
    onDelete: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  author: User;

  @OneToMany(() => Card, card => card.pillar)
  cards: Card[];
}
