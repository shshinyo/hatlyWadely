export interface Category {
  name?: string;
  icon?: string;
  id: string;
  myProducts:[]
}

export interface Product {
  id: string;
  imgUrl?: string;
  detail?: string;
  price?: number;
  afterDiscount?: number;
}
