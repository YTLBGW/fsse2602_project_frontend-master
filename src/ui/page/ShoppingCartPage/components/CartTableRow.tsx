import QuantitySelector from "../../../components/QuantitySelector.tsx";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

export default function CartTableRow() {

  return(
    <tr>
      <td>
        <img src=""
             width="200"
             />
      </td>
      <td>
        Product Name
      </td>
      <td>
        $Unit Price
      </td>
      <td>
        <QuantitySelector
            quantity={10}
            stock={999}
            handleQuantityMinusOne={()=>{}}
            handleQuantityMinusOne={()=>{}}
      </td>
      <td>
        <Button variant="danger">
          <FontAwesomeIcon icon={faTrashCan} style={{color: "rgb(177, 151, 252)",}} />
        </Button>
      </td>
    </tr>
  )
}