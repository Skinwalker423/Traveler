import {
  ReactNode,
  createContext,
  useReducer,
} from "react";

type User = {
  email: string;
  name: string;
  avatar: string;
  id: string;
};

export type AuthActionsMap = {
  "auth/login": User;
  "auth/logout": undefined;
  "auth/error": string;
  loading: undefined;
};

export type AuthActions = {
  [Key in keyof AuthActionsMap]: {
    type: Key;
    payload: AuthActionsMap[Key];
  };
}[keyof AuthActionsMap];

interface AuthState {
  user: User | null;
  error: string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: "",
  isAuthenticated: false,
  isLoading: false,
};

interface AuthContextProps {
  state: AuthState;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

const reducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case "auth/login":
      return {
        ...state,
        user: action.payload,
        error: "",
        isAuthenticated: true,
        isLoading: false,
      };

    case "auth/logout":
      return {
        ...state,
        user: null,
        error: "",
        isAuthenticated: false,
        isLoading: false,
      };
    case "auth/error":
      return {
        ...state,
        error: action.payload || "problem finding user",
        isLoading: false,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    default:
      throw new Error("not valid request");
  }
};

export const AuthContext = createContext(
  {} as AuthContextProps
);

export const Authprovider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const logIn = async (email: string, password: string) => {
    try {
      dispatch({ type: "loading", payload: undefined });
      const response = await fetch(
        `http://localhost:3000/users/?email=${email}`
      );
      const user = await response.json();

      if (!user.length) {
        dispatch({
          type: "auth/error",
          payload: "No user found",
        });
        return;
      }

      const foundUser = user[0];

      if (
        foundUser.password === password &&
        foundUser.email === email
      ) {
        dispatch({
          type: "auth/login",
          payload: {
            email: foundUser.email,
            avatar: foundUser.avatar,
            name: foundUser.name,
            id: foundUser.id,
          },
        });
      } else {
        dispatch({
          type: "auth/error",
          payload: "Could not verify email/password",
        });
      }

      console.log("user", foundUser);
    } catch (error: any) {
      console.error(error.message);
      dispatch({
        type: "auth/error",
        payload: error.message,
      });
    }
  };

  const logOut = () => {
    dispatch({ type: "auth/logout", payload: undefined });
  };

  const value = {
    state,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
