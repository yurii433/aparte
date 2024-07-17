import React, { useState } from "react";

import styles from "./Register.module.css";

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

  const registerNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("logging in...");
  };

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
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
          <AuthInputLabel label="Password">
            <input
              type="text"
              placeholder="Enter your password"
              value={newUserData?.password}
              name="password"
              onChange={handleUserDataChange}
            />
          </AuthInputLabel>

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
