import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { User, UserDocument } from './user.schema';

export type CourseAssignmentDocument = CourseAssignment & Document;

@Schema()
export class CourseAssignment {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ type: Types.ObjectId, ref: Course })
  course: CourseDocument;

  @Prop({ type: Types.ObjectId, ref: User })
  learner: UserDocument;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  completeDate: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CourseAssignmentSchema =
  SchemaFactory.createForClass(CourseAssignment);
