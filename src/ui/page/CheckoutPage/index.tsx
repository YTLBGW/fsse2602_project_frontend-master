import TopNavBar from "../../components/TopNavBar.tsx";
import { Button, Container } from "react-bootstrap";
import TransactionList from "./components/TransactionTable.tsx";
import { useContext, useEffect, useState } from "react";
import type { TransactionDto } from "../../../data/transaction/transaction.type.ts";
import LoadingContainer from "../../components/LoadingContainer.tsx";
import {
  getTransactionByTid,
  patchTransactionProcessing,
  patchTransactionSuccess,
} from "../../../api/transactionApi.ts";
import { LoginUserContext } from "../../../context/LoginUserContext.tsx";
import { useNavigate, useParams } from "@tanstack/react-router";

export default function CheckoutPage() {
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate({ from: "/checkout/$tid" });
  const { tid } = useParams({ from: "/checkout/$tid" });
  const [transactionDto, setTransactionDto] = useState<
    TransactionDto | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckOut = async () => {
    setIsCheckingOut(true);
    try {
      const stripeUrl = await patchTransactionProcessing(Number(tid));
      window.location.replace(stripeUrl);
      await patchTransactionSuccess(Number(tid));
      void navigate({ to: "/thankyou" });
    } catch {
      void navigate({ to: "/error" });
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      if (loginUser && tid) {
        try {
          setTransactionDto(await getTransactionByTid(Number(tid)));
        } catch {
          void navigate({ to: "/error" });
        } finally {
          setIsLoading(false);
        }
      }
    };
    void fetchTransaction();
  }, [loginUser, tid, navigate]);

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#0f0f1a", color: "#e0e0e0" }}
    >
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        {transactionDto && !isLoading ? (
          <div
            className="glass-container p-4 p-md-5 shadow-2xl"
            style={{ maxWidth: "600px", width: "100%" }}
          >
            <div className="text-center mb-4">
              <h1 className="display-5 fw-bold text-white mb-2">
                Finalize <span className="text-info">Order</span>
              </h1>
              <p className="text-white-50">Cyber-Receipt # {tid}</p>
            </div>

            <div className="mb-4">
              <TransactionList transactionDto={transactionDto} />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-5 px-2">
              <h3 className="text-white fw-bold mb-0">Total Amount:</h3>
              <h3 className="text-info fw-bold mb-0">
                ${transactionDto.total.toLocaleString()}
              </h3>
            </div>

            <div className="text-center">
              <Button
                variant="info"
                className="w-100 rounded-pill py-3 fw-bold text-uppercase kawaii-bounce fs-5"
                disabled={isCheckingOut}
                onClick={handleCheckOut}
              >
                {isCheckingOut ? "Processing..." : "Confirm & Pay Now"}
              </Button>
            </div>
          </div>
        ) : (
          <LoadingContainer />
        )}
      </Container>
    </div>
  );
}
