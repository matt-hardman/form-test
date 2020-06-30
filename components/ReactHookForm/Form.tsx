import React, { HTMLAttributes, useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import cx from "classnames";

import styles from "./Form.module.scss";

interface FormContext {
  register?: () => void;
  errors?: any;
}

const FormContext = React.createContext<FormContext>({});

export const useFormContext = (name = "Component") => {
  const context = useContext(FormContext);
  if (Object.keys(context).length === 0 && context.constructor === Object) {
    throw new Error(`${name} must be used inside a <Form /> component`);
  }

  return context;
};

interface Props<T> extends HTMLAttributes<HTMLElement> {
  onSubmitFn: (data: T) => void;
  validationSchema: Record<string, YupTypes>;
}

type YupTypes = yup.StringSchema<string> | yup.ObjectSchema<object>;

interface FormHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string;
}

interface FormContentsProps extends HTMLAttributes<HTMLElement> {}

interface FormFooterProps extends HTMLAttributes<HTMLElement> {
  submitButtonText?: string;
  onClose: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, className }) => (
  <header className={cx([styles.formHeader, className])}>
    <h1>{title}</h1>
  </header>
);

export const FormContents: React.FC<FormContentsProps> = ({
  children,
  className,
}) => <div className={cx([styles.formContents, className])}>{children}</div>;

export const FormFooter: React.FC<FormFooterProps> = ({
  submitButtonText = "Submit",
  onClose,
}) => (
  <footer className={styles.formFooter}>
    <button type="submit">{submitButtonText}</button>
    {onClose && (
      <button type="button" onClick={onClose}>
        Close
      </button>
    )}
  </footer>
);

function Form<T>({
  children,
  className,
  onSubmitFn,
  validationSchema,
}: Props<T>) {
  const wrappedValidationSchema = yup.object().shape(validationSchema);

  const { register, handleSubmit, errors } = useForm<T>({
    validationSchema: wrappedValidationSchema,
  });

  return (
    <FormContext.Provider value={{ register, errors }}>
      <form
        onSubmit={handleSubmit(onSubmitFn)}
        className={cx([styles.form, className])}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default Form;
