import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Module } from './module.schema';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Module })
  module: Module;

  @Prop({ required: true, enum: ['presentation', 'video', 'quiz', 'survey'] })
  type: 'presentation' | 'video' | 'quiz' | 'survey';

  @Prop({ required: false })
  presentationFile: string;

  @Prop({ required: false })
  videoUrl: string;

  @Prop({ required: false })
  videoFile: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
