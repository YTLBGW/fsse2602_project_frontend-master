import TopNavBar from "../../components/TopNavBar.tsx";
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "@tanstack/react-router";

export default function ThankYouPage() {
  const navigate = useNavigate({from: "/thankyou/"});

  return(
      <>
      <TopNavBar/>
        <Container>
          <div className="d-flex justify-content-center mb-4">
            <img src="https://images6.fanpop.com/image/photos/40800000/Mew-GIF-mew-the-pokemon-40820390-400-225.gif"/>

          </div>
          <div className="d-flex justify-content-center">
            <Button
                onClick={() => {
                  void navigate({to: "/"})
                }}
            >
              <h2>Back to Home page</h2>
            </Button>
          </div>
        </Container>
      </>
  )
}