import {Button, Spinner, Stack} from "react-bootstrap";

interface QuantitySelectorProps {
  quantity: number;
  handleQuantityMinusOne?: () => void;
  handleQuantityPlusOne?: () => void;
  stock: number;
  isLoading?: boolean;
}

export default function QuantitySelector({
  quantity,
  handleQuantityMinusOne,
  handleQuantityPlusOne,
  stock,
  isLoading = false,
}: QuantitySelectorProps) {
  return (
      <Stack direction="horizontal">
        <Button
            style={{height: 40, width: 40, padding: 0}}
            onClick={handleQuantityMinusOne}
            disabled={quantity <= 1 || isLoading}
        >
          -
        </Button>

        {
          isLoading
              ? (
                  <Spinner/>
              ) : (
                  <div
                      style={{width: 40}}
                      className="d-flex justify-content-center align-items-center"
                  > {quantity}
                  </div>
              )
        }

        <Button
            style={{height: 40, width: 40, padding: 0}}
            onClick={handleQuantityPlusOne}
            disabled={quantity >= stock || isLoading}
        >
          +
        </Button>
      </Stack>
  )
}
