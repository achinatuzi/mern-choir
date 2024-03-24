import { modelOptions, prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./userModel";

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

  @prop({ ref: User })
  public user?: Ref<User>;

  @prop({})
  public text!: string;

  @prop({ default: false })
  public isAdmin!: boolean;

  @prop({ default: Date.now })
  public date!: Date;

  @prop({ required: true, default: false })
  public isResponded!: boolean;
  @prop()
  public deliveredAt!: Date;
}


export const ContactModel = getModelForClass(Contact);
