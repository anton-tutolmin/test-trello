import { Card } from "../../cards/entities/card.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Card, card => card.comments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  card: Card;

  @ManyToOne(() => User, user => user.comments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  author: User
}