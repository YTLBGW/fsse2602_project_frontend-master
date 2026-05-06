import ProductCard from "./ProductCard.tsx";
import { Col, Row } from "react-bootstrap";
import type { GetAllProductDto } from "../../../../data/product/product.type.ts";

interface ProductCardContainerProps {
  dtoList: GetAllProductDto[];
}

export default function ProductCardContainer({
  dtoList,
}: ProductCardContainerProps) {
  return (
    <div className="py-4">
      <Row className="g-4">
        {dtoList.map((dto) => (
          <Col
            key={dto.pid}
            xs={12}
            sm={6}
            lg={4}
            xl={3}
            className="d-flex justify-content-center"
          >
            <ProductCard dto={dto} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
