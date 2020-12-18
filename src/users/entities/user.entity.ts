import { Desk } from "../../desks/entities/desk.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pillar } from "src/pillars/entities/pillar.entity";
import { Card } from "src/cards/entities/card.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { CreateUserDto } from "../dto/create-user.dto";

@Entity()
export class User {
  constructor(createUserDto: CreateUserDto) {
    this.username = createUserDto.username;
    this.password = createUserDto.password;
    this.email = createUserDto.email;
  }


  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Desk, desk => desk.author)
  ownedDesks: Desk[];

  @ManyToMany(() => Desk)
  @JoinTable()
  accessibleDesk: Desk[];

  @OneToMany(() => Pillar, pillar => pillar.author)
  ownedPillars: Pillar[];

  @OneToMany(() => Card, card => card.author)
  ownedCards: Card[];

  @OneToMany(() => Comment, comment => comment.author)
  ownedComments: Comment[];
}
