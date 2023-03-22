import axios from "axios";
import React, { createContext } from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const register = (
    nom,
    prenom,
    email,
    password,
    password_confirmation,
    filiere_id
  ) => {
    axios
      .post(`${BASE_URL}/register`, {
        nom,
        prenom,
        email,
        password,
        password_confirmation,
        filiere_id,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
      });
  };
  return (
    <AuthContext.Provider value='febai'>{children}</AuthContext.Provider>
  );
};
