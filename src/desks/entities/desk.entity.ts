import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pillar } from "../../pillars/entities/pillar.entity";

@Entity()
export class Desk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => User)
  @JoinTable()
  accessibleUsers: User[];

  @ManyToOne(() => User, user => user.ownedDesks)
  author: User;

  @OneToMany(() => Pillar, pillar => pillar.desk)
  pillars: Pillar[];
}
