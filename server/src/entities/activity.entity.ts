import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Module } from './module.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Module, (module) => module.id)
  module: Module;

  @Column()
  type: 'presentation' | 'video' | 'quiz' | 'survey';

  @Column({ nullable: true })
  presentationFile: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  videoFile: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
