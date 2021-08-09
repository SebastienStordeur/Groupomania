import React from 'react'
import logo from '../../images/icon-above-font.png'
import '../../style.css';
import RegisterForm from '../forms/RegisterForm';

const RegisterBody = () => {
  return (
    <section className="register-body">
      <div className="register-body__logo-container">
        <img src={logo} alt ="logo" className="register-logo-img"/>
      </div>
      <RegisterForm />
    </section>
  )
}


export default RegisterBody;
