import { Button, Container, Row, Col } from "react-bootstrap";
import QuantitySelector from "../../components/QuantitySelector.tsx";
import { useEffect, useState, useContext } from "react";
import type { ProductDto } from "../../../data/product/product.type.ts";
import { useNavigate, useParams } from "@tanstack/react-router";
import LoadingContainer from "../../components/LoadingContainer.tsx";
import { getProductByPid } from "../../../api/productApi.ts";
import { putCartItem } from "../../../api/cartItemApi.ts";
import { getGlowClass } from "../../theme/neonUtils.ts";
import { LoginUserContext } from "../../../context/LoginUserContext.tsx";

export default function ProductDetailPage() {
  const loginUser = useContext(LoginUserContext);
  const [productDto, setProductDto] = useState<ProductDto | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate({ from: "/product/$productId" });
  const { productId } = useParams({ from: "/product/$productId" });
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSuccessAddToCart, setIsSuccessAddToCart] = useState(false);

  const handleQuantityMinusOne = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };

  const handleQuantityPlusOne = () => {
    if (productDto && quantity < productDto.stock) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!loginUser) {
      void navigate({
        to: "/login",
        search: {
          redirect: `/product/${productId}`,
          reason: "add_to_cart",
        },
      });
      return;
    }

    if (productDto) {
      try {
        setIsAddingToCart(true);
        await putCartItem(productDto.pid, quantity);
        setIsSuccessAddToCart(true);

        setTimeout(() => {
          setIsSuccessAddToCart(false);
        }, 3000);
      } catch {
        void navigate({ to: "/error" });
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  const renderAddToCartBtn = () => {
    if (isSuccessAddToCart) {
      return (
        <Button
          className="ms-2 kawaii-bounce"
          variant="success"
          style={{ height: 45, width: 140 }}
        >
          Added to Cart!
        </Button>
      );
    } else if (isAddingToCart) {
      return (
        <Button className="ms-2" style={{ height: 45, width: 140 }} disabled>
          Adding...
        </Button>
      );
    } else {
      return (
        <Button
          className="ms-2 kawaii-bounce"
          style={{ height: 45, width: 140 }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      );
    }
  };

  useEffect(() => {
    const fetchProductByPid = async () => {
      try {
        const responseData = await getProductByPid(productId);
        setProductDto(responseData);
        setIsLoading(false);
      } catch {
        navigate({ to: "/error" });
      }
    };
    void fetchProductByPid();
  }, [productId, navigate]);

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#0f0f1a", color: "#e0e0e0" }}
    >
      {!isLoading && productDto ? (
        <Container className="flex-grow-1 py-5">
          <Row className="align-items-center gy-5">
            {/* Left Column: Visual Focus */}
            <Col
              md={6}
              className="text-center d-flex justify-content-center position-relative"
            >
              <div
                className={`position-absolute w-75 h-75 rounded-circle blur-3xl opacity-30 ${getGlowClass(productDto.name)}`}
                style={{ top: "10%", zIndex: 0, transition: "all 0.5s ease" }}
              ></div>
              <img
                className="img-fluid rounded-2xl shadow-2xl z-1 kawaii-bounce"
                src={productDto.imageUrl}
                alt={productDto.name}
                style={{ maxHeight: "600px", objectFit: "contain" }}
              />
            </Col>

            {/* Right Column: Details */}
            <Col md={6}>
              <div className="glass-container p-4 p-lg-5">
                <h1 className="display-4 fw-bold text-white mb-3">
                  {productDto.name}
                </h1>

                <div className="mb-4">
                  <span className="fs-2 fw-bold text-info">
                    ${productDto.price.toLocaleString()}
                  </span>
                  <div
                    className={`badge ${productDto.stock > 0 ? "bg-success" : "bg-danger"} ms-3`}
                  >
                    {productDto.stock > 0 ? `In Stock` : "Out of Stock"}
                  </div>
                </div>

                <p
                  className="lead text-white-50 mb-5"
                  style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}
                >
                  {productDto.description}
                </p>

                <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <QuantitySelector
                    quantity={quantity}
                    handleQuantityMinusOne={handleQuantityMinusOne}
                    handleQuantityPlusOne={handleQuantityPlusOne}
                    stock={productDto.stock}
                  />
                  {productDto.stock > 0 ? (
                    renderAddToCartBtn()
                  ) : (
                    <Button
                      variant="secondary"
                      disabled
                      className="ms-2 kawaii-bounce"
                      style={{ height: 45, width: 140 }}
                    >
                      Out of Stock
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <LoadingContainer />
      )}
    </div>
  );
}
