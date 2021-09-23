import React from "react";
import Header from "../Header";
import Logo from "../Logo";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div>
      <Header />
      <section className="public-body">
        <Logo />
        <SignupForm />
      </section>
    </div>
  )
}

export default Signup;