import styles from "./AuthButton.module.css";

interface AuthButtonProps {
  children: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ children }) => {
  return <button className={styles.authButton}>{children}</button>;
};

export default AuthButton;
