import React from "react";
import styles from "./styles.module.css"

type LayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {

  return <div className={styles.authContent}>{children}</div>
};

export default AuthLayout;
