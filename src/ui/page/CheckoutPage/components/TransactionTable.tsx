import {Table} from "react-bootstrap";
import TransactionTableRow from "./TransactionTableRow.tsx";
import type {TransactionDto} from "../../../../data/transaction/transaction.type.ts";

interface Props{
  transactionDto: TransactionDto;
}

export default function TransactionTable({transactionDto}: Props) {
  return (
      <Table className="align-middle">
        <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Sub-total</th>

        </tr>
        </thead>
        <tbody>

        {
          transactionDto.items.map((transactionItem) => (
              <TransactionTableRow
                key={transactionItem.tpid}
                transactionItem={transactionItem}
              />
          ))
        }

        </tbody>
      </Table>
  )
}