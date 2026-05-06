import TopNavBar from "../../components/TopNavBar.tsx";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "@tanstack/react-router";

export default function ErrorPage() {
  const navigate = useNavigate({ from: "/error" });

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#0f0f1a", color: "#e0e0e0" }}
    >
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="text-center d-flex flex-column align-center align-items-center">
          <h1 className="display-4 fw-bold text-white mb-4">
            Oops! Something went wrong.
          </h1>
          <div className="mb-5 position-relative">
            <img
              src="https://i.pinimg.com/originals/0d/05/20/0d05201572964220c7c3b6ceab245bd8.gif"
              style={{ height: "450px", objectFit: "contain" }}
              alt="Error Page"
              className="rounded-4 shadow-lg"
            />
            <div
              className="position-absolute top-50 start-50 translate-middle w-100 h-100 rounded-circle blur-3xl opacity-20"
              style={{ backgroundColor: "var(--neon-dark)", zIndex: -1 }}
            ></div>
          </div>
          <Button
            variant="outline-info"
            className="rounded-pill px-5 py-3 fw-bold text-uppercase kawaii-bounce"
            onClick={() => navigate({ to: "/" })}
          >
            Return Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
