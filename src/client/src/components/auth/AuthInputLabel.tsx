import styles from "./AuthInputLabel.module.css";

interface AuthInputLabelProps {
  children: any;
  label: string;
}

const AuthInputLabel: React.FC<AuthInputLabelProps> = ({ label, children }) => {
  return (
    <>
      <label className={styles.authInput}>
        {" "}
        {label}
        {children}
      </label>
    </>
  );
};

export default AuthInputLabel;
