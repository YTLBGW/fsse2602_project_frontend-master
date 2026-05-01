import {Table} from "react-bootstrap";
import CartTableRow from "./CartTableRow.tsx";

export default function CartTable() {

  return (
  <Table striped bordered hover>
    <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Unit Price</th>
      <th>Username</th>
    </tr>
    </thead>
    <tbody>
    {
      Array.map(()=>(
          <CartTableRow/>
      ))
    }
    </tbody>
  </Table>
  )
}