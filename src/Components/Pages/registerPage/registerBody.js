import React from 'react'
import '../../../style.css';
import RegisterForm from './RegisterForm';
import MainLogo from './MainLogo';

const RegisterBody = () => {
  return (
    <section className="register-body">
      <MainLogo />
      <RegisterForm />
    </section>
  )
}


export default RegisterBody;
