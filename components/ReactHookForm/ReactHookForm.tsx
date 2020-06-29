import React from "react";
import styles from "./ReactHookForm.module.scss";
import { useForm } from "react-hook-form";

interface Inputs {
  email: string;
  role: string;
}

const ReactHookForm = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [formData, setFormData] = React.useState<Inputs>();

  const onSubmit = (data) => {
    setFormData(data);
  };

  console.log(formData);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.email}>
          <label htmlFor="email">Email Address: </label>
          <input name="email" type="email" ref={register({ required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className={styles.role}>
          <input
            name="role"
            type="radio"
            value="admin"
            ref={register}
            defaultChecked
          />
          <label htmlFor="admin">Admin</label>

          <input
            name="role"
            type="radio"
            value="station_owner"
            ref={register}
          />
          <label htmlFor="admin">Station Owner</label>

          <input
            name="role"
            type="radio"
            value="insights_only"
            ref={register}
          />
          <label htmlFor="admin">Insights Only</label>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {formData && (
        <div>
          <p>Email: {formData.email}</p>
          <p>Role: {formData.role}</p>
        </div>
      )}
    </>
  );
};

export default ReactHookForm;
