import React from 'react'
import '../../style.css';
import RegisterForm from '../forms/RegisterForm';
import MainLogo from '../SignupRegisterPages/MainLogo';

const RegisterBody = () => {
  return (
    <section className="register-body">
      <MainLogo />
      <RegisterForm />
    </section>
  )
}


export default RegisterBody;
