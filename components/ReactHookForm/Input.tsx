import React from "react";

interface Props {
  name: string;
  title: string;
  type?: string;
}

const FormInput: React.FC<Props> = ({ name, title, type = "text" }) => {
  const reference = () => {};

  return (
    <>
      <label htmlFor={name}>{title}: </label>
      <input name={name} type={type} ref={reference} />
    </>
  );
};

export default FormInput;
