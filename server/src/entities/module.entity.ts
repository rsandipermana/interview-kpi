import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectId } from 'mongoose';
import { Activity } from './activity.entity';
import { Course } from './course.entity';

@Entity()
export class Module {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Course, (course) => course.id)
  course: Course;

  @OneToMany(() => Activity, (activity) => activity.id)
  activities: Activity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
