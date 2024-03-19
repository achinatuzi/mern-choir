import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Image {
  public _id?: string;

  @prop({ required: true })
  public image!: string;
}

export const ImageModel = getModelForClass(Image);