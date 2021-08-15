export interface User {
  id?: number;
  name?: string;
  phone?: string;
  location?: string;
  userType?: string;
  version?: number;
}

export interface Product {
  id?: string;
  name?: string;
  desc?: string;
  category?: string;
  sellingNum?: number;
  rateNum?: number;
  photos?: [{ type: string }];
  productAmount?: number;
  price?: number;
  ProductCreator?: string;
}
