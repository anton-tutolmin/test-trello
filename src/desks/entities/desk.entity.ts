import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Desk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => User)
  accessibleUsers: User[];

  @ManyToOne(() => User, user => user.ownedDesks)
  author: User;
}
