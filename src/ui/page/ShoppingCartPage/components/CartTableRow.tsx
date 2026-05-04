import QuantitySelector from "../../../components/QuantitySelector.tsx";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import type {CartItemDto} from "../../../../data/cartitem/cartitem.type.ts";
import {deleteCartItem, patchCartItemQuantity} from "../../../../api/cartItemApi.ts";
import {useState} from "react";

interface Props {
  cartItem: CartItemDto;
  handleQuantityChange: (pid: number, quantity: number) => void;
  handleDeleteCartItem: (pid: number) => void;
}

export default function CartTableRow({cartItem, handleQuantityChange, handleDeleteCartItem}: Props) {

  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingCartItem, setIsDeletingCartItem] = useState(false);

  const handleQuantityMinusOne = async () => {
    setIsLoading(true);
    await patchCartItemQuantity(cartItem.pid, cartItem.cartQuantity -1);
    handleQuantityChange(cartItem.pid, cartItem.cartQuantity - 1);
    setIsLoading(false);
  }

  const handleQuantityPlueOne = async () => {
    setIsLoading(true);
    await patchCartItemQuantity(cartItem.pid, cartItem.cartQuantity + 1);
    handleQuantityChange(cartItem.pid, cartItem.cartQuantity + 1);
    setIsLoading(false);
  }

  const handleDelete = async () => {
    setIsDeletingCartItem(true);
    await deleteCartItem(cartItem.pid);
    handleDeleteCartItem(cartItem.pid);
    setIsDeletingCartItem(false);
  }

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
              handleQuantityMinusOne={handleQuantityMinusOne}
              handleQuantityPlusOne={handleQuantityPlueOne}
              isLoading={isLoading}
              />
        </td>
        <td>${cartItem.price * cartItem.cartQuantity}</td>
        <td>
          <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isDeletingCartItem}
          >
            <FontAwesomeIcon icon={faTrashCan} style={{color: "rgb(255, 255, 255)",}}/>
          </Button>
        </td>
      </tr>
  )
}
