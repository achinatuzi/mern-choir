/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      firstName: string;
      surName: string;
      otherName: string;
      userName: string;
      gender: string;
      image: string;
      voice: string;
      joined: Date;
      graduated: Date;
      level: string;
      slug: string;
      position: string;
      post: string;
      birthMonthDay: Date;
      phone: string;
      password: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
  }
}
