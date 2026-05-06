import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { getAllProducts } from "../../../api/productApi.ts";
import type { GetAllProductDto } from "../../../data/product/product.type.ts";

export default function HomePage() {
  const [shuffledCards, setShuffledCards] = useState<GetAllProductDto[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Backend 資料
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getAllProducts();
        const shuffled = products.sort(() => 0.5 - Math.random()).slice(0, 10);
        setShuffledCards(shuffled);
      } catch (error) {
        console.error("Failed to fetch products for carousel:", error);
      }
    }
    fetchProducts();
  }, []);

  // 2. 自動滾動 (Auto-scroll) 邏輯
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // 如果碌到最尾，就 smooth scroll 返去起點
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // 每次向右碌一張卡嘅闊度 (大約 260px 包含 gap)
          const cardWidth = carouselRef.current.children[0]?.clientWidth || 240;
          carouselRef.current.scrollBy({
            left: cardWidth + 20,
            behavior: "smooth",
          });
        }
      }
    }, 2500); // 每 2.5 秒自動碌一次

    return () => clearInterval(interval); // Cleanup function
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0f0f1a",
        minHeight: "100vh",
        paddingBottom: "80px",
        overflowX: "hidden",
      }}
    >
      {/* Responsive Style Block (手機 vs Desktop) */}
      <style>{`
        .responsive-title { font-size: 2.5rem; font-weight: bold; color: white; z-index: 10; }
        .responsive-card-container { flex: 0 0 160px; scroll-snap-align: center; }
        .responsive-card-img { width: 160px; height: 223px; object-fit: cover; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: block; background-color: #2a2a35; }

        @media (min-width: 768px) {
          .responsive-title { font-size: 4rem; }
          .responsive-card-container { flex: 0 0 240px; }
          .responsive-card-img { width: 240px; height: 335px; }
        }
      `}</style>

      {/* Hero Section */}
      <section
        style={{
          height: "35vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <h1 className="responsive-title">Pokémon TCG</h1>
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(59, 130, 246, 0.1)",
            filter: "blur(120px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
      </section>

      {/* Carousel Section */}
      <section>
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            padding: "0 24px",
          }}
        >
          <h2
            style={{ fontSize: "1.5rem", fontWeight: "600", color: "#d1d5db" }}
          >
            Featured Rarities
          </h2>
        </div>

        {/* Carousel 容器 */}
        <div
          ref={carouselRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            gap: "20px",
            padding: "20px 20px 40px 20px",
            scrollbarWidth: "none", // 隱藏 Scrollbar (Firefox)
            msOverflowStyle: "none", // 隱藏 Scrollbar (IE/Edge)
            alignItems: "center",
          }}
        >
          {shuffledCards.map((product) => (
            <div key={product.pid} className="responsive-card-container">
              <Link
                to="/product/$productId"
                params={{ productId: product.pid.toString() }}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://asia.pokemon-card.com/tw/card-img/products/Back_of_card.png";
                    }}
                    className="responsive-card-img"
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#a0a0a0",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    {product.name}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Description & Button Section */}
      <section style={{ padding: "0 24px", marginTop: "10px" }}>
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <p
            style={{
              fontSize: "1rem",
              color: "#9ca3af",
              fontStyle: "italic",
              lineHeight: "1.6",
            }}
          >
            Collect the rarest creatures, master the elements and dominate the
            arena. Enter the Vault to find legendary Pokémon Trading Cards and
            build a deck that strikes fear into every opponent.
          </p>

          <div style={{ marginTop: "30px" }}>
            <Link
              to="/products"
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                borderRadius: "50px",
                padding: "12px 30px",
                fontWeight: "bold",
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "0 4px 15px rgba(255,255,255,0.2)",
              }}
            >
              Explore the Vault
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
