import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Contact {
  public _id?: string;

  @prop({
    trim: true,
    maxlength: [30, "Other Name cannot exceed 30 characters"],
    minlength: [3, "Other Name should have more than 4 characters"],
  })
  public fullname!: string;

  @prop({
    required: [true, "Please Enter Your Email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    trim: true,
  })
  public email!: string;

  @prop({
  })
  public text!: string;

  @prop({ default: false })
  public isAdmin!: boolean;

  @prop({ default: Date.now })
  public date!: Date;
}

export const ContactModel = getModelForClass(Contact);
