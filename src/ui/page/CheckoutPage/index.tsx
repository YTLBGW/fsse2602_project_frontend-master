import {Button, Container} from "react-bootstrap";
import TransactionTable from "./components/TransactionTable.tsx";
// import mockData from "./response.json";
import {useContext, useEffect, useState} from "react";
import type {TransactionDto} from "../../../data/transaction/transaction.type.ts";
import LoadingContainer from "../../components/LoadingContainer.tsx";
import {getTransactionByTid, patchTransactionProcessing, patchTransactionSuccess} from "../../../api/transactionApi.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.tsx";
import {useNavigate, useParams} from "@tanstack/react-router";

export default function CheckoutPage() {
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate({from: "/checkout/$tid"});
  const {tid} = useParams({from: "/checkout/$tid"})
  const [transactionDto, setTransactionDto] = useState<TransactionDto | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckOut = async () => {
    setIsCheckingOut(true);
    await patchTransactionProcessing(Number(tid));
    await patchTransactionSuccess(Number(tid));
    void navigate({to: "/thankyou"});
  }

  useEffect(() => {
    const fetchTransaction = async () => {
      if(loginUser && tid){
        setTransactionDto(await getTransactionByTid(Number(tid)));
        setIsLoading(false);
      }
    }
    void fetchTransaction();
  }, [loginUser]);

  return (
      <Container>
        <h1>Checkout</h1>

        {
          transactionDto && !isLoading ? (
              <>
                <TransactionTable
                    transactionDto={transactionDto}
                />
                <h2>Total: ${transactionDto.total.toLocaleString()}</h2>
                <div>
                  <Button
                      variant="success"
                      disabled={isCheckingOut}
                      onClick={handleCheckOut}
                  >
                    <h2>Pay</h2>
                  </Button>
                </div>
              </>
          ) : (
              <LoadingContainer/>
          )
        }
      </Container>
  )
}