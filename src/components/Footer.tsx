import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by
        Traveler Inc.
      </p>
    </footer>
  );
};

export default Footer;
