import { Alert, Button, Container, Form } from "react-bootstrap";
import { type SyntheticEvent, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../../../authService/FirebaseAuthService.ts";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { LoginUserContext } from "../../../context/LoginUserContext.tsx";
import { GoogleLoginButton } from "react-social-login-buttons";

export default function LoginPage() {
  const router = useRouter();
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate({ from: "/login/" });
  const [loginBtnClicked, setLoginBtnClicked] = useState(false);

  const handleLogin = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    const loginResult = await signInWithEmailAndPassword(email, password);

    if (!loginResult) {
      setLoginBtnClicked(true);
      setIsLoginFailed(true);
    }
  };

  useEffect(() => {
    if (loginUser && loginBtnClicked) {
      router.history.back();
    }

    if (loginUser) {
      navigate({ to: "/" });
    }
  }, [loginUser]);

  return (
      <div
          className="min-vh-100 d-flex flex-column"
          style={{ backgroundColor: "#0f0f1a", color: "#e0e0e0" }}
      >
        <Container className="flex-grow-1 d-flex justify-content-center align-items-center py-5">
          <div
              className="glass-container p-4 p-md-5 shadow-2xl neon-glow-default"
              style={{ maxWidth: "450px", width: "100%" }}
          >
            <div className="text-center mb-4">
              <h1 className="display-5 fw-bold text-white mb-2">
                Access <span className="text-info">Portal</span>
              </h1>
              <p className="text-white-50">
                Authenticate to manage your collection
              </p>
            </div>

            <Form onSubmit={handleLogin}>
              {isLoginFailed && (
                  <Alert variant="danger" className="text-center py-2">
                    Input incorrect email or password!
                  </Alert>
              )}
              <Form.Group className="mb-3">
                <Form.Label className="text-white-50 small fw-bold">
                  Email address
                </Form.Label>
                {/* Force white background and black text */}
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="bg-white text-dark"
                    style={{ color: "black", backgroundColor: "white" }}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="text-white-50 small fw-bold">
                  Password
                </Form.Label>
                {/* Force white background and black text */}
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-white text-dark"
                    style={{ color: "black", backgroundColor: "white" }}
                />
              </Form.Group>

              <Button
                  className="w-100 rounded-pill py-3 fw-bold text-uppercase kawaii-bounce mb-3"
                  variant="info"
                  type="submit"
              >
                Login
              </Button>

              <div className="text-center mb-3">
                <span className="text-white-50 small">OR</span>
              </div>

              <div className="kawaii-bounce">
                <GoogleLoginButton
                    onClick={() => {
                      setLoginBtnClicked(true);
                      signInWithGoogle();
                    }}
                    style={{
                      width: "100%",
                      height: "45px",
                      borderRadius: "50px",
                      margin: "0",
                      fontSize: "16px",
                      fontWeight: "bold",
                      transition: "transform 0.2s ease",
                    }}
                />
              </div>
            </Form>
          </div>
        </Container>
      </div>
  );
}