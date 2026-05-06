import TopNavBar from "../../components/TopNavBar.tsx";
import { Button, Container, Row, Col } from "react-bootstrap";
import CartItem from "./components/CartItem.tsx";
import { useContext, useEffect, useState } from "react";
import type { CartItemDto } from "../../../data/cartitem/cartitem.type.ts";
import LoadingContainer from "../../components/LoadingContainer.tsx";
import { useNavigate } from "@tanstack/react-router";
import { getUserCart } from "../../../api/cartItemApi.ts";
import { LoginUserContext } from "../../../context/LoginUserContext.tsx";
import { postTransaction } from "../../../api/transactionApi.ts";

export default function ShoppingCartPage() {
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate({ from: "/cart/" });
  const [cartItemDtoList, setCartItemDtoList] = useState<
    CartItemDto[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const renderTotal = () => {
    if (cartItemDtoList) {
      return cartItemDtoList.reduce(
        (total, cartItemDto) =>
          total + cartItemDto.cartQuantity * cartItemDto.price,
        0,
      );
    } else {
      return 0;
    }
  };

  const handleQuantityChange = (pid: number, quantity: number) => {
    setCartItemDtoList(
      cartItemDtoList?.map((cartItemDto) => {
        if (cartItemDto.pid === pid) {
          cartItemDto.cartQuantity = quantity;
        }
        return cartItemDto;
      }),
    );
  };

  const handleDeleteCartItem = (pid: number) => {
    setCartItemDtoList(
      cartItemDtoList?.filter((cartItemDto) => cartItemDto.pid !== pid),
    );
  };

  const handleCheckOut = async () => {
    setIsCheckingOut(true);
    try {
      const responseData = await postTransaction();
      void navigate({ to: `/checkout/${responseData.tid}` });
    } catch {
      void navigate({ to: "/error" });
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    const fetchCartItemDtoList = async () => {
      try {
        const responseData = await getUserCart();
        setCartItemDtoList(responseData);
      } catch {
        setIsError(true);
        void navigate({ to: "/error" });
      } finally {
        setIsLoading(false);
      }
    };
    if (loginUser) {
      void fetchCartItemDtoList();
    } else if (loginUser === null) {
      void navigate({ to: "/login" });
    }
  }, [loginUser, navigate]);

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#0f0f1a", color: "#e0e0e0" }}
    >
      <TopNavBar />
      <Container className="flex-grow-1 py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-white mb-2">
            Your <span className="text-info">Cart</span>
          </h1>
          <p className="text-white-50">Manage your rare Pokémon acquisitions</p>
        </div>

        {isLoading && <LoadingContainer />}

        {!isLoading && (
          <>
            {cartItemDtoList && cartItemDtoList.length > 0 ? (
              <Row className="gy-4">
                {/* Left Column: Cart Items */}
                <Col lg={8}>
                  <div className="d-flex flex-column">
                    {cartItemDtoList.map((cartItem) => (
                      <CartItem
                        key={cartItem.pid}
                        cartItem={cartItem}
                        handleQuantityChange={handleQuantityChange}
                        handleDeleteCartItem={handleDeleteCartItem}
                      />
                    ))}
                  </div>
                </Col>

                {/* Right Column: Order Summary */}
                <Col lg={4}>
                  <div
                    className="glass-container p-4 sticky-top"
                    style={{ top: "100px" }}
                  >
                    <h4 className="text-white fw-bold mb-4 border-bottom border-white/20 pb-2">
                      Order Summary
                    </h4>
                    <div className="d-flex justify-content-between mb-5">
                      <span className="fs-4 text-white fw-bold">Total:</span>
                      <span className="fs-4 text-info fw-bold">
                        ${renderTotal().toLocaleString()}
                      </span>
                    </div>
                    <Button
                      variant="info"
                      onClick={handleCheckOut}
                      disabled={isCheckingOut}
                      className="w-100 rounded-pill py-3 fw-bold text-uppercase kawaii-bounce"
                    >
                      {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                    </Button>
                  </div>
                </Col>
              </Row>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
                <div
                  className="glass-container p-5 shadow-2xl"
                  style={{ maxWidth: "600px", width: "100%" }}
                >
                  <h3 className="text-white mb-3 fw-bold">
                    Your cart is empty!
                  </h3>
                  <p className="text-white-50 mb-4 fs-5">
                    Time to find some legendary cards for your collection.
                  </p>
                  <Button
                    variant="info"
                    className="rounded-pill kawaii-bounce px-5 py-3 fw-bold text-uppercase"
                    onClick={() => navigate({ to: "/" })}
                  >
                    Go Shopping
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
