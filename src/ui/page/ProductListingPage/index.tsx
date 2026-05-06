import TopNavBar from "../../components/TopNavBar.tsx";
import ProductCardContainer from "./components/ProductCardContainer.tsx";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { GetAllProductDto } from "../../../data/product/product.type.ts";

import { useNavigate } from "@tanstack/react-router";
import LoadingContainer from "../../components/LoadingContainer.tsx";
import { getAllProducts } from "../../../api/productApi.ts";

export default function ProductListingPage() {
  const [getAllProductDtoList, setGetAllProductDtoList] = useState<
    GetAllProductDto[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const responseData = await getAllProducts();
        setGetAllProductDtoList(responseData);
        setIsLoading(false);
      } catch {
        navigate({ to: "/error" });
      }
    };
    void fetchAllProduct();
  }, [navigate]);

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#0f0f1a", color: "#e0e0e0" }}
    >
      <TopNavBar />
      <Container className="flex-grow-1 py-5">
        <div className="text-center mb-5">
          <h1
            className="display-3 fw-bold text-white mb-3"
            style={{ textShadow: "0 0 15px rgba(255,255,255,0.3)" }}
          >
            Pokémon <span className="text-info">Vault</span>
          </h1>
          <p
            className="lead text-white-50 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Level up your collection with authentic, high-tier Pokémon cards.
          </p>
        </div>

        {getAllProductDtoList && !isLoading ? (
          <ProductCardContainer dtoList={getAllProductDtoList} />
        ) : (
          <LoadingContainer />
        )}
      </Container>
    </div>
  );
}
