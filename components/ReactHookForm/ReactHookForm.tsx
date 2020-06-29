import React from "react";
import styles from "./ReactHookForm.module.scss";
import { useForm } from "react-hook-form";

interface Inputs {
  email: string;
}

const ReactHookForm = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = (data) => {
    console.log("submitted");
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input name="email" type="email" ref={register({ required: true })} />
      {errors.email && <span>"This field is required"</span>}

      <label htmlFor="admin">Admin</label>
      <input
        name="group"
        type="radio"
        value="admin"
        ref={register}
        defaultChecked
      />

      <label htmlFor="admin">Station Owner</label>
      <input name="group" type="radio" value="station_owner" ref={register} />

      <label htmlFor="admin">Insights Only</label>
      <input name="group" type="radio" value="insights_only" ref={register} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReactHookForm;
