import {Button, Stack} from "react-bootstrap";

interface QuantitySelectorProps {
  quantity: number,
  handleQuantityMinusOne?: () => void,
  handleQuantityPlusOne?: () => void,
  stock: number
}

export default function QuantitySelector({
                                           quantity,
                                           handleQuantityMinusOne,
                                           handleQuantityPlusOne,
                                           stock
                                         }: QuantitySelectorProps) {
  return (
      <Stack direction="horizontal">
        <Button
            style={{height: 40, width: 40, padding: 0}}
            onClick={handleQuantityMinusOne}
            disabled={quantity <= 1}
        > - </Button>
        <div
            style={{width: 40}}
            className="d-flex justify-content-center align-items-center"
        > {quantity}
        </div>
        <Button
            style={{height: 40, width: 40, padding: 0}}
            onClick={handleQuantityPlusOne}
            disabled={quantity >= stock}
        > + </Button>
      </Stack>
  )
}