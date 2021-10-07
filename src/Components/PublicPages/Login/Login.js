import React from "react";
import Header from "../Header";
import Logo from "../Logo";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return(
    <div>
      <Header />
      <section className="public-body">
        <Logo />
        <LoginForm />
      </section>
    </div>
  )
}

export default Login;