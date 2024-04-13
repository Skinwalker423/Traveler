import { ReactNode, createContext } from "react";

export const AuthContext = createContext({});

export const Authprovider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = {};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
