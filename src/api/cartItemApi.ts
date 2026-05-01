import axios from "axios";
import type {CartItemDto} from "../data/cartitem/cartitem.type.ts";
import {getAuthConfig} from "../authService/FirebaseAuthService.ts";

const baseUrl = "http://localhost:8080";

export async function getUserCart() {
  const response = await axios.get<CartItemDto[]>(
      `${baseUrl}/cart/items`,
      await getAuthConfig()
      );
  return response.data;
}

export async function putCartItem(pid: number, quantity: number) {
      await axios.put<CartItemDto[]>(
      `${baseUrl}/cart/items/${pid}/${quantity}`,
          null,
          await getAuthConfig()
      );
}