import TopNavBar from "../../components/TopNavBar.tsx";
import ProductCardContainer from "./components/ProductCardContainer.tsx";
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import type {GetAllProductDto} from "../../../data/product/product.type.ts";

// import mockData from "./response.json";
import {useNavigate} from "@tanstack/react-router";
import LoadingContainer from "../../components/LoadingContainer.tsx";
import {getAllProducts} from "../../../api/productApi.ts";

export default function ProductListingPage() {
  const [getAllProductDtoList, setGetAllProductDtoList] = useState<GetAllProductDto[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate({from: "/"});

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const responseData = await getAllProducts();
        setGetAllProductDtoList(responseData);
        setIsLoading(false);
      } catch {
        navigate({to: "/error"});
      }

    }
    void fetchAllProduct();
  }, []);

  return (
      <>
        <TopNavBar/>
        <Container>
          {
            getAllProductDtoList && !isLoading
                ? <ProductCardContainer dtoList={getAllProductDtoList}/>
                : <LoadingContainer/>
          }

        </Container>
      </>
  )
}