import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { Activity, ActivityDocument } from './activity.schema';

export type ModuleDocument = Module & Document;

@Schema()
export class Module {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Course' })
  course: CourseDocument;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Activity' }] })
  activities: ActivityDocument[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
