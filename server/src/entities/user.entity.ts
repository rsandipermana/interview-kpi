import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectId } from 'mongoose';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: 'administrator' | 'provider' | 'learner';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
