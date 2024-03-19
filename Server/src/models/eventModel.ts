import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './userModel';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Event {
  public _id?: string;

  @prop({ required: true })
  public theme!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public date!: string;

  @prop({ required: true })
  public venue!: string;

  @prop({ required: true })
  public time!: string;

}

export const EventModel = getModelForClass(Event);



