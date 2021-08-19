export interface User {
  id?: number;
  name?: string;
  phone?: string;
  location?: string;
  userType?: string;
  version?: number;
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
  _id: string;
  name: string;
  id: string;
  __v: number;
}

export interface Image {
  id: number;
  file: File;
  type: string;
  name: string;
  imageShow: any;
}
