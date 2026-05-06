import type { TransactionItem } from "../../../../data/transaction/transaction.type.ts";
import { getGlowClass } from "../../../theme/neonUtils.ts";

interface Props {
  transactionItem: TransactionItem;
}

export default function TransactionItemRow({ transactionItem }: Props) {
  return (
    <div
      className={`d-flex align-items-center justify-content-between p-3 mb-3 border-bottom border-white/10 transition-all hover:bg-white/5`}
    >
      <div className="d-flex align-items-center">
        <div
          className={`p-1 rounded-lg bg-black/20 border border-white/10 ${getGlowClass(transactionItem.product.name)}`}
        >
          <img
            src={transactionItem.product.imageUrl}
            width={60}
            alt={transactionItem.product.name}
            className="rounded-sm"
          />
        </div>
        <div className="ms-3">
          <h6 className="text-white mb-0 fw-bold">
            {transactionItem.product.name}
          </h6>
          <span className="text-white-50 small">
            ${transactionItem.product.price.toLocaleString()} x{" "}
            {transactionItem.quantity}
          </span>
        </div>
      </div>
      <div className="fw-bold text-info">
        ${transactionItem.subtotal.toLocaleString()}
      </div>
    </div>
  );
}
