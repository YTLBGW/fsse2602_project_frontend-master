import TopNavBar from "../../components/TopNavBar.tsx";
import {Button, Container} from "react-bootstrap";
import CartTable from "./components/CartTable.tsx";
import {useContext, useEffect, useState} from "react";
import type {CartItemDto} from "../../../data/cartitem/cartitem.type.ts";
import LoadingContainer from "../../components/LoadingContainer.tsx";
import {useNavigate} from "@tanstack/react-router";
import {getUserCart} from "../../../api/cartItemApi.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.tsx";

export default function ShoppingCartPage() {
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate({from: "/cart/"});
  const [cartItemDtoList, setCartItemDtoList] = useState<CartItemDto[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const renderTotal = () => {
    if(cartItemDtoList){
      return cartItemDtoList.reduce((total, cartItemDto) => (
          total + cartItemDto.cartQuantity * cartItemDto.price
      ), 0);
    }else{
      return 0;
    }
  }

  useEffect(() => {
    const fetchCartItemDtoList = async () => {
      try{
        const responseData = await getUserCart();
        setCartItemDtoList(responseData);
      } catch {
        setIsError(true);
        void navigate({to: "/error"})
      }finally {
        setIsLoading(false);
      }
    }
    if(loginUser){
      void fetchCartItemDtoList();
    }else if(loginUser === null){
      void navigate({to: "/login"});
    }
  }, [loginUser, navigate]);

  return (
      <>
      <TopNavBar/>
        <Container>
          <h1>Shopping Cart</h1>

          {
            isLoading && <LoadingContainer/>
          }

          {
            !isLoading && cartItemDtoList &&
              <CartTable
                cartItemDtoList={cartItemDtoList}
              />
          }


          <h1>Total: ${renderTotal().toLocaleString()}</h1>
          <Button variant="success"><h1>Pay</h1></Button>
        </Container>
      </>
  )
}