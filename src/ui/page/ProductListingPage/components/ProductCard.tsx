import {Button, Card} from "react-bootstrap";
import type {GetAllProductDto} from "../../../../data/product/product.type.ts";
import {Link} from "@tanstack/react-router";

interface ProductCardProps {
  dto: GetAllProductDto;
}

export default function ProductCard({dto}: ProductCardProps) {

  return (

      <Card style={{width: '18rem'}}>
        <Card.Img variant="top" src={dto.imageUrl}/>
        <Card.Body>
          <Card.Title style={{height: "4rem"}}>{dto.name}</Card.Title>
          <Card.Text>
            ${dto.price.toLocaleString()} <br/>
            {dto.hasStock? "in stock" : "out of stock"}
          </Card.Text>
          <Link
              to={"/product/$productId"}
              params={{productId: dto.pid.toString()}}
          >
            <Button variant="primary">Details</Button>
          </Link>
        </Card.Body>
      </Card>

  )
}
