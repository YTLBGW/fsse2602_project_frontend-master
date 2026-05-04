import type {TransactionItem} from "../../../../data/transaction/transaction.type.ts";

interface Props{
  transactionItem: TransactionItem;
}

export default function TransactionTableRow({transactionItem}: Props){
  return (
      <tr>
        <td>
          <img src={transactionItem.product.imageUrl}
               width={140}
               />
        </td>
        <td>{transactionItem.product.name}</td>
        <td>${transactionItem.product.price.toLocaleString()}</td>
        <td>{transactionItem.quantity}</td>
        <td>${transactionItem.subtotal.toLocaleString()}</td>
      </tr>
  )
}