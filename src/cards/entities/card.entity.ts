import { Comment } from "../../comments/entities/comment.entity";
import { Pillar } from "../../pillars/entities/pillar.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Pillar, pillar => pillar.cards, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  pillar: Pillar;

  @ManyToOne(() => User, user => user.cards, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  author: User;

  @OneToMany(() => Comment, comment => comment.card)
  comments: Comment[];
}