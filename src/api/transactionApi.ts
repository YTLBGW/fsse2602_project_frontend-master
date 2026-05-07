import axios from "axios";
import type {TransactionDto} from "../data/transaction/transaction.type.ts";
import {getAuthConfig} from "../authService/FirebaseAuthService.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getTransactionByTid(tid: number) {
  const response = await axios.get<TransactionDto>(
      `${baseUrl}/transactions/${tid}`,
      await getAuthConfig()
  );
  return response.data;
}

export async function postTransaction(){
  const response = await axios.post<TransactionDto>(
      `${baseUrl}/transactions`,
      null,
      await getAuthConfig()
  );
  return response.data;
}

export async function patchTransactionProcessing(tid: number){
      const response = await axios.patch<string>(
      `${baseUrl}/transactions/${tid}/payment`,
      null,
      await getAuthConfig()
  );
      return response.data;
}

export async function patchTransactionSuccess(tid: number){
  const response = await axios.patch<string>(
      `${baseUrl}/transactions/${tid}/success`,
      null,
      await getAuthConfig()
  );
  return response.data;
}