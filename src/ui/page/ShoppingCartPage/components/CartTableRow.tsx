import QuantitySelector from "../../../components/QuantitySelector.tsx";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import type {CartItemDto} from "../../../../data/cartitem/cartitem.type.ts";

interface Props {
  cartItem: CartItemDto;
}

export default function CartTableRow({cartItem}: Props) {

  return (
      <tr>
        <td>
          <img
              src={cartItem.imageUrl}
              width={120}
          />
        </td>
        <td>{cartItem.name}</td>
        <td>${cartItem.price.toLocaleString()}</td>
        <td>
          <QuantitySelector
              quantity={cartItem.cartQuantity}
              stock={cartItem.stock}
              handleQuantityMinusOne={() => {}}
              handleQuantityMinusOne={() => {}}
              />
        </td>
        <td>${cartItem.price * cartItem.cartQuantity}</td>
        <td>
          <Button
              variant="danger"
          >
            <FontAwesomeIcon icon={faTrashCan} style={{color: "rgb(255, 255, 255)",}}/>
          </Button>
        </td>
      </tr>
  )
}
