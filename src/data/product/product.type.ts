export interface GetAllProductDto {
  pid: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  hasStock: boolean;
}

export interface ProductDto {
  pid: number
  name: string
  description: string
  imageUrl: string
  price: number
  stock: number
}
