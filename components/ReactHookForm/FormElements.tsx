import React, { HTMLAttributes, useContext } from "react";
import { ErrorMessage } from "react-hook-form";
import cx from "classnames";

import styles from "./Form.module.scss";
import { useFormContext } from "./Form";

interface Props extends HTMLAttributes<HTMLElement> {
  name: string;
  title: string;
}

interface FormInputProps extends Props {
  type?: string;
  placeholder?: string;
  errorMessage?: string;
}

interface RadioGroupInputProps extends Props {
  inputs: Array<Omit<RadioInputProps, "name">>;
}

interface RadioInputProps extends HTMLAttributes<HTMLElement> {
  value: string;
  name: string;
  label: string;
  defaultChecked?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  className,
  name,
  title,
  type = "text",
  placeholder,
  errorMessage,
}) => {
  const { register, errors } = useFormContext("FormInput");

  return (
    <div className={cx([styles.formItem, className])}>
      <label htmlFor={name} className={styles.title}>
        {title}
      </label>
      <input name={name} type={type} ref={register} placeholder={placeholder} />
      <ErrorMessage name={name} errors={errors}>
        {({ message }) => <span>{errorMessage ?? message}</span>}
      </ErrorMessage>
    </div>
  );
};

export const RadioInput: React.FC<RadioInputProps> = ({
  value,
  name,
  label,
  defaultChecked,
}) => {
  const { register } = useFormContext("RadioInput");

  return (
    <div key={value} className={styles.radioButton}>
      <input
        name={name}
        type="radio"
        value={value}
        ref={register}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export const RadioInputGroup: React.FC<RadioGroupInputProps> = ({
  className,
  title,
  name,
  inputs,
}) => {
  return (
    <fieldset
      className={cx([styles.formItem, styles.formItemRadio, className])}
    >
      <legend className={styles.title}>{title}</legend>
      <div className={styles.radioButtonGroup}>
        {inputs.map(({ value, label, defaultChecked }) => (
          <RadioInput
            key={value}
            name={name}
            value={value}
            label={label}
            defaultChecked={defaultChecked}
          />
        ))}
      </div>
    </fieldset>
  );
};
