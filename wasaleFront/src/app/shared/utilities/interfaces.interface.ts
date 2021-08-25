export type UserType = "Admin" | "General" | "Client" | "Both" | "Pilot";

export interface User {
  name?: string;
  username?: string;
  email?: string;
  address?: string;
  phone?: string;
  userType?: UserType;
  password?: string;
  token?: string;
  profileImg?: string;
  propertyDesc?: string;
  confirmed?: any;
  cart?: [];
}

export interface Product {
  _id?: string;
  name?: string;
  desc?: string;
  category?: string;
  sellingNum?: number;
  rateNum?: number;
  photos?: [{ type?: string }];
  productAmount?: number;
  price?: number;
  ProductCreator?: string;
}

export interface Category {
  _id?: string;
  name?: string;
  id?: string;
  __v?: number;
}

export interface Image {
  id: number;
  file: File;
  type: string;
  name: string;
  imageShow: any;
}
