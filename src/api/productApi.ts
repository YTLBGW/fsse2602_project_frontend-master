import axios from "axios";
import type {GetAllProductDto, ProductDto} from "../data/product/product.type.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getAllProducts() {
  const response = await axios.get<GetAllProductDto[]>(`${baseUrl}/public/products`);
  return response.data;
}

export async function getProductByPid(pid: string) {
  const response = await axios.get<ProductDto>(`${baseUrl}/public/products/${pid}`);
  return response.data;
}