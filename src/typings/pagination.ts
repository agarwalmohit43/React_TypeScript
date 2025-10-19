export interface ProductItemInterface {
  title: string;
  thumbnail: string;
  availabilityStatus: string;
  price: number;
}

export interface ProductData {
  products: ProductItemInterface[];
  total: number;
  skip: number;
  limit: number;
}
