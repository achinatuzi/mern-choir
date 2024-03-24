import bcrypt from "bcryptjs";
// import { User } from './models/userModel'
// import { Product } from './models/productModel'

export const sampleUsers = [
  {
    image: 'chi.jpg',
    firstName: "Aldrian",
    slug: "Born to rule",
    surName: "Solomon",
    otherName: "King",
    userName: "ouji",
    voice: "Bass",
    gender: "Male",
    joined: "02-04-2021",
    graduated: "02-04-2021",
    position: "Alumni",
    post: "Chior Master",
    phone: "09039354698",
    birthMonthDay: "02-04-2021",
    email: "admin@example.com",
    password: bcrypt.hashSync("2345678"),
    isAdmin: true,
  },
];
