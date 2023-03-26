import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (userData) => {
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
  };

  const updateUserContext = (updatedUser) => {
    setUser(updatedUser);
  };

  const updateUser = async (updatedData) => {
    try {
      const response = await fetch(
        "http://10.0.2.2:8000/api/etudiants/" + user.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la mise à jour des informations utilisateur"
        );
      }

      const data = await response.json();
     
      updateUserContext(data);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des informations utilisateur:",
        error
      );
    }
  };

  const value = {
    user,
    signIn,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
