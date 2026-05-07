import { Button, Container } from "react-bootstrap";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {useEffect} from "react";
import {patchTransactionSuccess} from "../../../api/transactionApi.ts";

export default function ThankYouPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/thankyou/" });
  const tid = search?.tid;

  useEffect(() => {
    const finalizeTransaction = async () => {
      if (tid) {
        try {
          await patchTransactionSuccess(Number(tid));
        } catch (error) {
          console.error("Failed to mark transaction as success", error);
        }
      }
    };
    void finalizeTransaction();
  }, [tid]);

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#0f0f1a", color: "#e0e0e0" }}
    >
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div
          className="glass-container p-4 p-md-5 text-center shadow-2xl"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <div className="mb-4 position-relative d-flex justify-content-center">
            <div
              className="position-absolute top-50 start-50 translate-middle w-75 h-75 rounded-circle blur-3xl opacity-40"
              style={{ backgroundColor: "var(--neon-psychic)", zIndex: 0 }}
            ></div>
            <img
              src="https://images6.fanpop.com/image/photos/40800000/Mew-GIF-mew-the-pokemon-40820390-400-225.gif"
              alt="Success"
              className="z-1 rounded-4"
              style={{ maxHeight: "250px" }}
            />
          </div>

          <h1 className="display-4 fw-bold text-white mb-3 text-nowrap">
            Payment Successful!
          </h1>
          <p className="lead text-white-50 mb-2 text-nowrap">
            Thank you for your order. Your legendary cards are being prepared!
          </p>
          <p className="text-info fw-bold mb-5 fs-5">Transaction ID: #{tid}</p>

          <Button
            variant="info"
            className="rounded-pill px-5 py-3 fw-bold text-uppercase kawaii-bounce"
            onClick={() => {
              void navigate({ to: "/" });
            }}
          >
            Continue Shopping
          </Button>
        </div>
      </Container>
    </div>
  );
}
