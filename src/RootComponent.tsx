import {Outlet} from "@tanstack/react-router";
import {useEffect, useState} from "react";
import type {UserData} from "./data/user/user.type.ts";
import {onAuthStateChanged} from "./authService/FirebaseAuthService.ts";
import {LoginUserContext} from "./context/LoginUserContext.tsx";

export default function RootComponent() {

  const [loginUser, setLoginUser] = useState<UserData | undefined | null>(undefined);

  useEffect(() => {
    onAuthStateChanged(setLoginUser);
  }, [])

  return (
    <LoginUserContext value={loginUser}>
      <Outlet/>
    </LoginUserContext>
  )
}