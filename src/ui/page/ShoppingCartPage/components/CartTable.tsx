import {Table} from "react-bootstrap";
import CartTableRow from "./CartTableRow.tsx";
import type {CartItemDto} from "../../../../data/cartitem/cartitem.type.ts";

interface Props{
  cartItemDtoList: CartItemDto[];
}

export default function CartTable({cartItemDtoList}: Props) {

  return (
  <Table className="align-middle" hover>
    <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Unit Price</th>
      <th></th>
      <th>Sub-total</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    {
      cartItemDtoList.map((cartItem) => (
          <CartTableRow
            key={cartItem.pid}
            cartItem={cartItem}
      />
      ))
    }
    </tbody>
  </Table>
  )
}