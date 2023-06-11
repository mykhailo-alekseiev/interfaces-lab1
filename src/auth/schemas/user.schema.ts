import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Gender {
  Man = 'man',
  Female = 'female',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  gender: Gender;

  @Prop()
  birthdayDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
