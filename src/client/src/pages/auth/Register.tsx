import React, { useState } from "react";

import styles from "./Register.module.css";
import axios from "axios";

import AuthInputLabel from "../../components/auth/AuthInputLabel";
import AuthButton from "../../components/auth/AuthButton";

const Register: React.FC = () => {
  interface newUserProps {
    email: string;
    password: string;
  }

  const [newUserData, setNewUserData] = useState<newUserProps>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const registerNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL = `https://aparte-api.onrender.com/users`;

    try {
      const users = await axios.get(URL);
      console.log(users.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.registerForm}>
      <div className={styles.registerFormWrap}>
        <h2>
          Enter your email and password <br /> to create account
        </h2>
        <div className={styles.inputFields}></div>
        <form onSubmit={registerNewUser}>
          <AuthInputLabel label="Email">
            <input
              type="text"
              placeholder="Enter your email"
              value={newUserData?.email}
              name="email"
              onChange={handleUserDataChange}
            />
          </AuthInputLabel>
          {errors.emailError && (
            <div className={styles.loginError}>Check your email</div>
          )}
          <AuthInputLabel label="Password">
            <input
              type="password"
              placeholder="Enter your password"
              value={newUserData?.password}
              name="password"
              onChange={handleUserDataChange}
            />
          </AuthInputLabel>
          {errors.passwordError && (
            <div className={styles.loginError}>Check your password</div>
          )}

          <AuthButton>Register</AuthButton>
        </form>
        <div className={styles.underText}>
          {" "}
          <p>
            Registering a new account with Aparte.com, you are agreeing with{" "}
            <br /> our <a href="">Terms and Conditions</a> and{" "}
            <a href="">Confidentiality Policy</a>.
          </p>
          <p>All rights reserved</p>
          <p>
            Copyright 2024 Aparte.com<sup>TM</sup>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
