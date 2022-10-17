import { Component } from "react";
import Dashboard from "./Dashboard/dashboard";
import ForgetPassword from "./Login/forgetpassword";
import Login from "./Login/login";
import Signup from "./Signup/signup";

export default [
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/documents",
    Component: Dashboard,
  },
  {
    path: "/forgetpassword",
    Component: ForgetPassword,
  },
];
