import TopNavBar from "../../components/TopNavBar.tsx";
import {Button, Container, Stack} from "react-bootstrap";
import QuantitySelector from "../../components/QuantitySelector.tsx";
// import mockData from "./response.json";
import {useEffect, useState} from "react";
import type {ProductDto} from "../../../data/product/product.type.ts";
import {useNavigate, useParams} from "@tanstack/react-router";
import LoadingContainer from "../../components/LoadingContainer.tsx";
import {getProductByPid} from "../../../api/productApi.ts";


export default function ProductDetailPage() {
  const [productDto, setProductDto] = useState<ProductDto | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate({from: "/product/$productId"});
  const {productId} = useParams({from: "/product/$productId"});
  const [quantity, setQuantity] = useState(1);

  const handleQuantityMinusOne = () => {
    if (quantity > 1) {
      setQuantity(prevState => (prevState-1));
    }
  }

  const handleQuantityPlusOne = () => {
    if (productDto && quantity < productDto.stock) {
      setQuantity(prevState => (prevState+1));
    }
  }

  useEffect(() => {
    const fetchProductByPid = async () => {
      try {
        const responseData = await getProductByPid(productId);
        setProductDto(responseData);
        setIsLoading(false);
      } catch {
        navigate({to: "/error"})
      }
    }
    void fetchProductByPid();
  }, []);

  return (
      <>
        <TopNavBar/>
        {
          !isLoading && productDto
              ? (
                  <Container>
                    <img style={{height: "500px"}}
                         className="mt-4 mb-4"
                         src={productDto?.imageUrl}
                         alt={productDto.name}
                    />
                    <h3
                        className="mb-4"
                    >
                      {productDto.name}
                    </h3>

                    <h5
                        style={{whiteSpace: "pre-line"}}
                        className="mb-4"
                    >
                      {productDto.description}
                    </h5>
                    <h5
                        className="mb-4"
                    >${productDto.price.toLocaleString()}
                    </h5>
                    <Stack direction="horizontal">
                      <QuantitySelector
                        quantity={quantity}
                        handleQuantityMinusOne={handleQuantityMinusOne}
                        handleQuantityPlusOne={handleQuantityPlusOne}
                        stock={productDto.stock}
                      />
                      {
                        productDto.stock>0
                          ? <Button className="ms-2" style={{height: 40, width: 100, padding: 0}}>Add to Cart</Button>
                            : <Button variant="secondary" disabled className="ms-2" style={{height: 40, width: 100, padding: 0}}>Out of Stock</Button>
                      }

                    </Stack>


                  </Container>
              )
              : (
                  <LoadingContainer/>
              )
        }

      </>
  )
}