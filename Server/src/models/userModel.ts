import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  public _id?: string;

  @prop({
    required: [true, "Please Enter Your Nick-Name"],
    trim: true,
    maxlength: [30, "Nick-Name cannot exceed 30 characters"],
    minlength: [3, "Nick-Name should have more than 3 characters"],
  })
  public userName!: string;

  @prop({
    required: [true, "Please Enter Your First Name"],
    trim: true,
    maxlength: [30, "First Name cannot exceed 30 characters"],
    minlength: [3, "First Name should have more than 4 characters"],
  })
  public firstName!: string;

  @prop({
    required: [true, "Please Enter Your Sur-Name"],
    trim: true,
    maxlength: [30, "Sur-Name cannot exceed 30 characters"],
    minlength: [3, "Sur-Name should have more than 4 characters"],
  })
  public surName!: string;

  @prop({ })
  public otherName!: string;

  @prop({ required: [true, "Please Select Your Voice"] })
  public voice!: string;

  @prop({
    required: [true, "Please, Briefly Describe Yourself"],
    maxlength: [30, "Description cannot exceed 30 characters"],
    minlength: [10, "Description should have more than 10 characters"],
  })
  public slug!: string;

  @prop({})
  public level!: string;

  @prop({})
  public graduated!: string;

  @prop({ required: [true, "Please Enter Your Choir Status(Alumni/Student)"] })
  public position!: string;

  @prop({})
  public post!: string;

  @prop({ required: [true, "Please Select Your Date of Birth"] })
  public birthMonthDay!: string;

  @prop({ required: [true, "Please Enter Your Mobile Number"] })
  public phone!: string;

  @prop({ required: [true, "Please Select Your Gender"] })
  public gender!: string;

  @prop({})
  public image!: string;

  @prop({ required: [true, "Please Select Date Joined"] })
  public joined!: string;

  @prop({
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should have more than 4 characters"],
    select: false,
  })
  public password!: string;

  @prop({
    required: [true, "Please Enter Your Email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    // unique: true,
    trim: true,
  })
  public email!: string;

  @prop({ default: false })
  public isAdmin!: boolean;

}

export const UserModel = getModelForClass(User);
