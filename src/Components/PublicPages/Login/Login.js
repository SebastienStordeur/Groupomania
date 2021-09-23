import React from "react";
import Header from "../Header";
import Logo from "../Logo";
import LoginForm from "./LoginForm";

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