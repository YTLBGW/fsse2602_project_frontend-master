import TopNavBar from "../../components/TopNavBar.tsx";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {type SyntheticEvent, useContext, useEffect, useState} from "react";
import {signInWithEmailAndPassword, signInWithGoogle} from "../../../authService/FirebaseAuthService.ts";
import {useNavigate, useRouter} from "@tanstack/react-router";
import {LoginUserContext} from "../../../context/LoginUserContext.tsx";
import {GoogleLoginButton} from "react-social-login-buttons";

export default function LoginPage(){
  const router=  useRouter();
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate({from: "/login/"});
  const [loginBtnClicked, setLoginBtnClicked] = useState(false);

  const handleLogin = async (event: SyntheticEvent<HTMLFormElement>)=>{

    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: {value: string},
      password: {value: string},
    }

    const email = target.email.value;
    const password = target.password.value;

    // console.log(email + "+" + password);

    const loginResult = await signInWithEmailAndPassword(email, password);

    if(!loginResult){
      setLoginBtnClicked(true);
      setIsLoginFailed(true);
    }
  }

  useEffect(() => {
    if(loginUser && loginBtnClicked){
      router.history.back();
    }

    if(loginUser){
      navigate({to: "/"});
    }
  }, [loginUser]);

  return(
      <>
      <TopNavBar/>
        <Container className="d-flex justify-content-center align-items-center">
          <Form className="mt-5" style={{ width: '300px' }} onSubmit={handleLogin}>
            {
              isLoginFailed &&
                <Alert variant="danger">
                  Input incorrect email or password!
                </Alert>
            }
            <Form.Group className="mt-5 mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
            <Button className="w-100" variant="info" type="submit">
              Login
            </Button>

            <GoogleLoginButton
                onClick={()=> {
              setLoginBtnClicked(true);
              signInWithGoogle();}}
                style={{
                  width: "100%",
                  height: "38px",
                  borderRadius: "6px",
                  margin: "0",
                  marginTop: "10px",
                  fontSize: "16px",
                }}
            />

          </Form>
        </Container>

      </>
  )
}