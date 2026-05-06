import QuantitySelector from "../../../components/QuantitySelector.tsx";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import type { CartItemDto } from "../../../../data/cartitem/cartitem.type.ts";
import {
  deleteCartItem,
  patchCartItemQuantity,
} from "../../../../api/cartItemApi.ts";
import { useState } from "react";
import { getGlowClass } from "../../../theme/neonUtils.ts";

interface Props {
  cartItem: CartItemDto;
  handleQuantityChange: (pid: number, quantity: number) => void;
  handleDeleteCartItem: (pid: number) => void;
}

export default function CartItem({
  cartItem,
  handleQuantityChange,
  handleDeleteCartItem,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingCartItem, setIsDeletingCartItem] = useState(false);

  const handleQuantityMinusOne = async () => {
    if (cartItem.cartQuantity > 1) {
      setIsLoading(true);
      await patchCartItemQuantity(cartItem.pid, cartItem.cartQuantity - 1);
      handleQuantityChange(cartItem.pid, cartItem.cartQuantity - 1);
      setIsLoading(false);
    }
  };

  const handleQuantityPlusOne = async () => {
    if (cartItem.cartQuantity < cartItem.stock) {
      setIsLoading(true);
      await patchCartItemQuantity(cartItem.pid, cartItem.cartQuantity + 1);
      handleQuantityChange(cartItem.pid, cartItem.cartQuantity + 1);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeletingCartItem(true);
    await deleteCartItem(cartItem.pid);
    handleDeleteCartItem(cartItem.pid);
    setIsDeletingCartItem(false);
  };

  return (
    <div
      className={`cyber-card kawaii-bounce ${getGlowClass(cartItem.name)} p-3 mb-3 d-flex align-items-center`}
    >
      <div className="flex-shrink-0 me-3">
        <img
          src={cartItem.imageUrl}
          width={80}
          alt={cartItem.name}
          className="rounded-lg"
        />
      </div>
      <div className="flex-grow-1">
        <h5 className="text-white mb-1 fw-bold fs-4">{cartItem.name}</h5>
        <div className="text-white-50 fs-5 mb-2">
          ${cartItem.price.toLocaleString()} / unit
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <QuantitySelector
            quantity={cartItem.cartQuantity}
            stock={cartItem.stock}
            handleQuantityMinusOne={handleQuantityMinusOne}
            handleQuantityPlusOne={handleQuantityPlusOne}
            isLoading={isLoading}
          />
          <div className="fw-bold text-info fs-5 ms-3">
            ${(cartItem.price * cartItem.cartQuantity).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="ms-3">
        <Button
          variant="outline-danger"
          onClick={handleDelete}
          disabled={isDeletingCartItem}
          className="rounded-circle p-2 border-danger/30 hover:bg-danger"
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} className="text-white" />
        </Button>
      </div>
    </div>
  );
}
