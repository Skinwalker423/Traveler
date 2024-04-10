import { PropsWithChildren } from "react";

import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  type?: "back" | "primary" | "position";
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  type = "primary",
  disabled = false,
}: ButtonProps) => {
  const navigate = useNavigate();
  if (type === "back") {
    return (
      <button
        disabled={disabled}
        className={`${styles.btn} ${styles[type]}`}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        className={`${styles.btn} ${styles[type]}`}
        onClick={(e) => {
          e.preventDefault();
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
