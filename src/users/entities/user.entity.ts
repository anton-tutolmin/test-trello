import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "src/cards/entities/card.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Pillar } from "src/pillars/entities/pillar.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 25,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 25,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar'
  })
  password: string;

  @OneToMany(() => Pillar, pillar => pillar.author)
  pillars: Pillar[];

  @OneToMany(() => Card, card => card.author)
  cards: Card[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];
}