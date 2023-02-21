import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity()
export class CourseAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.id)
  course: Course;

  @ManyToOne(() => User, (user) => user.id)
  learner: User;

  @Column()
  startDate: Date;

  @Column()
  completeDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
