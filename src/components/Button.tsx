import { PropsWithChildren } from "react";

import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  theme?: "back" | "primary" | "position";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  onClick,
  theme = "primary",
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const navigate = useNavigate();
  if (theme === "back") {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`${styles.btn} ${styles[theme]}`}
        onClick={() => {
          navigate(-1);
        }}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`${styles.btn} ${styles[theme]}`}
        onClick={() => {
          if (!onClick) return;
          onClick();
        }}
      >
        {children}
      </button>
    );
  }
};

export default Button;
