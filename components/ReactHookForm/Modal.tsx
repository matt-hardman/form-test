import React, { HTMLAttributes } from "react";
import styles from "./Modal.module.scss";

interface Props extends HTMLAttributes<HTMLElement> {}

const FormModal: React.FC<Props> = ({ children }) => {
  return <main className={styles.component}>{children}</main>;
};

export default FormModal;
