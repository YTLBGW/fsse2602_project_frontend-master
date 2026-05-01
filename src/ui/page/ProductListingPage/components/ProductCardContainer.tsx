import ProductCard from "./ProductCard.tsx";
import {Col, Row} from "react-bootstrap";
import type {GetAllProductDto} from "../../../../data/product/product.type.ts";

interface ProductCardContainerProps {
  dtoList: GetAllProductDto[];
}

export default function ProductCardContainer({dtoList}: ProductCardContainerProps) {

  return (
      <Row className="my-3">
        {
          dtoList.map(
              (dto) => (
              <Col
                  className="d-flex justify-content-center my-2"
                  xs={12} md={6} lg={4} xl={3}
              >
                <ProductCard dto={dto}/>
              </Col>
          ))
        }
      </Row>
  )
}