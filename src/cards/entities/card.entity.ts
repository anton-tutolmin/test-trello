import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pillar } from "../../pillars/entities/pillar.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { User } from "../../users/entities/user.entity";

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
    cascade: true,
    nullable: false,
  })
  pillar: Pillar;

  @OneToMany(() => Comment, comment => comment.card)
  comments: Comment[];

  @ManyToOne(() => User, user => user.ownedCards)
  author: User;
}
