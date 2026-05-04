export interface TransactionDto {
  tid: number
  buyerUid: number
  datetime: string
  status: string
  total: number
  items: TransactionItem[]
}

export interface TransactionItem {
  tpid: number
  product: TransactionProduct
  quantity: number
  subtotal: number
}

export interface TransactionProduct {
  description: string
  imageUrl: string
  name: string
  pid: number
  price: number
  stock: number
}
