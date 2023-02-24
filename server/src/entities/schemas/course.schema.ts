import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Module, ModuleDocument } from './module.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ required: true })
  keyword: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Module }] })
  modules: ModuleDocument[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
