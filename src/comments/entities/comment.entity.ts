import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "../../cards/entities/card.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Card, card => card.comments)
  card: Card

  @ManyToOne(() => User, user => user.ownedComments)
  author: User;
}
