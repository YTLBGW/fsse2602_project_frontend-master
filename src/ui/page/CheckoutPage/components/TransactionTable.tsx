import type { TransactionDto } from "../../../../data/transaction/transaction.type.ts";
import TransactionItemRow from "./TransactionTableRow.tsx";

interface Props {
  transactionDto: TransactionDto;
}

export default function TransactionList({ transactionDto }: Props) {
  return (
    <div className="mb-4">
      {transactionDto.items.map((item) => (
        <TransactionItemRow key={item.tpid} transactionItem={item} />
      ))}
    </div>
  );
}
