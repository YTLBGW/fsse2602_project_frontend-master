import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "@tanstack/react-router";
import ProductCardContainer from "./components/ProductCardContainer.tsx";
import LoadingContainer from "../../components/LoadingContainer.tsx";
import { getAllProducts } from "../../../api/productApi.ts";
import type { GetAllProductDto } from "../../../data/product/product.type.ts";

export default function ProductListingPage() {
  const [allProducts, setAllProducts] = useState<GetAllProductDto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<GetAllProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate({ from: "/" });

  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const responseData = await getAllProducts();
        setAllProducts(responseData);
        setFilteredProducts(responseData);
        setIsLoading(false);
      } catch {
        navigate({ to: "/error" });
      }
    };
    void fetchAllProduct();
  }, [navigate]);

  const availableAttributes = Array.from(
      new Set(
          allProducts
              .map((p) => (p.description ? p.description.charAt(0) : ""))
              .filter((attr) => attr.trim() !== "")
      )
  );

  useEffect(() => {
    let result = [...allProducts];
    if (selectedAttribute) {
      result = result.filter(
          (p) => p.description && p.description.charAt(0) === selectedAttribute
      );
    }
    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(result);
  }, [sortOrder, selectedAttribute, allProducts]);

  const cyberBtnStyle = (isActive: boolean) => ({
    background: isActive ? "rgba(0, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
    color: isActive ? "#0ff" : "rgba(255, 255, 255, 0.7)",
    border: `1px solid ${isActive ? "#0ff" : "rgba(255, 255, 255, 0.1)"}`,
    borderRadius: "4px",
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    transition: "all 0.2s ease",
  });

  const labelStyle = {
    color: "rgba(0, 255, 255, 0.8)",
    fontSize: "10px",
    fontWeight: "bold",
    marginBottom: "8px",
    letterSpacing: "2px",
    textAlign: "left" as const,
  };

  return (
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#0f0f1a", color: "#e0e0e0" }}>
        <Container className="flex-grow-1 py-3 px-3">
          {/* 精簡化 Header */}
          <div className="text-start mb-3 px-1">
            <h1 className="h2 fw-bold text-white mb-1">
              Pokémon <span className="text-info">Vault</span>
            </h1>
            <p className="small text-white-50 mb-0">High-tier collectibles.</p>
          </div>

          {!isLoading && (
              <div
                  style={{
                    background: "rgba(20, 20, 35, 0.8)",
                    backdropFilter: "blur(15px)",
                    borderLeft: "3px solid #0ff",
                    borderRadius: "6px",
                    padding: "16px",
                    marginBottom: "20px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
                  }}
              >
                {/* 價格排序 - 橫向捲動 */}
                <div className="mb-3">
                  <div style={labelStyle}>&gt; SORT BY PRICE</div>
                  <div className="d-flex gap-2 overflow-auto pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <button style={cyberBtnStyle(sortOrder === "none")} onClick={() => setSortOrder("none")}>Default</button>
                    <button style={cyberBtnStyle(sortOrder === "asc")} onClick={() => setSortOrder("asc")}>LOW-HIGH</button>
                    <button style={cyberBtnStyle(sortOrder === "desc")} onClick={() => setSortOrder("desc")}>HIGH-LOW</button>
                  </div>
                </div>

                {/* 屬性過濾 - 橫向捲動 */}
                {availableAttributes.length > 0 && (
                    <div>
                      <div style={labelStyle}>&gt; FILTER TYPE</div>
                      <div className="d-flex gap-2 overflow-auto pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        <button style={cyberBtnStyle(selectedAttribute === null)} onClick={() => setSelectedAttribute(null)}>ALL</button>
                        {availableAttributes.map((attr, index) => (
                            <button key={index} style={cyberBtnStyle(selectedAttribute === attr)} onClick={() => setSelectedAttribute(attr)}>
                              {attr}系
                            </button>
                        ))}
                      </div>
                    </div>
                )}
              </div>
          )}

          {!isLoading ? (
              <div className="mt-2">
                <ProductCardContainer dtoList={filteredProducts} />
              </div>
          ) : (
              <LoadingContainer />
          )}
        </Container>
      </div>
  );
}