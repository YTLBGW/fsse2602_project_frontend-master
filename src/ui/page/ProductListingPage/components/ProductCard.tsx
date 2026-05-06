import { Button } from "react-bootstrap";
import type { GetAllProductDto } from "../../../../data/product/product.type.ts";
import { Link } from "@tanstack/react-router";

interface ProductCardProps {
  dto: GetAllProductDto;
}

export default function ProductCard({ dto }: ProductCardProps) {
  const getGlowClass = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("charizard") || n.includes("fire")) return "neon-glow-fire";
    if (n.includes("blastoise") || n.includes("water"))
      return "neon-glow-water";
    if (n.includes("venusaur") || n.includes("grass")) return "neon-glow-grass";
    if (n.includes("pikachu") || n.includes("electric"))
      return "neon-glow-electric";
    return "neon-glow-default";
  };

  return (
    <div
      className={`cyber-card kawaii-bounce ${getGlowClass(dto.name)} p-3 h-100 d-flex flex-column shadow-sm`}
    >
      <div className="overflow-hidden rounded-xl mb-3 bg-black/20">
        <img
          src={dto.imageUrl}
          alt={dto.name}
          className="img-fluid w-100 object-fit-contain transition-transform duration-500 hover:scale-110"
          style={{ height: "200px" }}
        />
      </div>

      <div className="flex-grow-1 d-flex flex-column">
        <h5 className="text-white fw-bold mb-2" style={{ minHeight: "3rem" }}>
          {dto.name}
        </h5>

        <div className="mb-3">
          <span className="fs-4 fw-bold text-white">
            ${dto.price.toLocaleString()}
          </span>
          <div
            className={`badge ${dto.hasStock ? "bg-success" : "bg-danger"} ms-2`}
          >
            {dto.hasStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <Link
          to={"/product/$productId"}
          params={{ productId: dto.pid.toString() }}
          className="mt-auto"
        >
          <Button
            variant="outline-light"
            className="w-100 rounded-pill border-white/30 hover:bg-white hover:text-dark transition-all"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
