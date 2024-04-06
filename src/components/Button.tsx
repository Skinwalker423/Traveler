import { PropsWithChildren } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  type?: string;
}

const Button = ({
  children,
  onClick,
  type = "primary",
}: ButtonProps) => {
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
};

export default Button;
