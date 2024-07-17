import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <a href="/" className={styles.logoLink}>
          <h2>Aparte.com</h2>
        </a>
        <div className={styles.buttonWrapper}>
          <a href="/login" className={styles.mainBtn}>
            Login
          </a>
          <a href="/register" className={styles.mainBtn}>
            Register
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
