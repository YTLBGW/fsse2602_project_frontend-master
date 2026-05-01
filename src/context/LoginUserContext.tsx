import {createContext} from "react";
import type {UserData} from "../data/user/user.type.ts";

export const LoginUserContext = createContext<UserData | undefined | null>(undefined)