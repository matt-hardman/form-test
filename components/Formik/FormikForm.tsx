import React from "react";
import styles from "./Formik.module.scss";
import { Formik } from "formik";

const FormikForm = () => (
  <Formik
    initialValues={{ email: "", role: "Admin" }}
    validate={(values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      console.log(values);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.email}>
          <label htmlFor="email">Email address: </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
        </div>

        <div className={styles.role}>
          <input
            type="radio"
            name="role"
            defaultChecked
            onChange={handleChange}
            onBlur={handleBlur}
            value="admin"
          />
          <label htmlFor="admin">Admin</label>

          <input
            type="radio"
            name="role"
            onChange={handleChange}
            onBlur={handleBlur}
            value="station_owner"
          />
          <label htmlFor="admin">Station Owner</label>

          <input
            type="radio"
            name="role"
            onChange={handleChange}
            onBlur={handleBlur}
            value="insights_only"
          />
          <label htmlFor="admin">Insights Only</label>
        </div>

        <div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    )}
  </Formik>
);

export default FormikForm;
