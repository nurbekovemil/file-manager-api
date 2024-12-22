import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  type: string;

  @Column({ default: 0 })
  size: number;

  @ManyToOne(() => User, (user) => user.files)
  @JoinColumn()
  user: User;
}
