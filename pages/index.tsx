import React, { useState } from "react";
import styles from "./Index.module.scss";
import * as yup from "yup";

import FormModal from "../components/ReactHookForm/Modal";
import Form, {
  FormHeader,
  FormFooter,
  FormContents,
} from "../components/ReactHookForm/Form";

import {
  FormInput,
  RadioInputGroup,
} from "../components/ReactHookForm/FormElements";

interface Inputs {
  email: string;
  role: string;
}

const Home = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Inputs>();

  const onSubmit = (data: Inputs) => {
    setFormData(data);
    setOpen(false);
  };

  const onClose = () => setOpen(false);

  const validationSchema = {
    email: yup.string().email().required(),
    role: yup.string().required(),
  };

  return (
    <div>
      {open && (
        <FormModal>
          <Form
            onSubmitFn={onSubmit}
            validationSchema={validationSchema}
            className={styles.form}
          >
            <FormHeader title="Create New User" />

            <FormContents className={styles.formContents}>
              <FormInput
                name="email"
                type="email"
                title="Email Address"
                placeholder="email@domain.com"
              />

              <RadioInputGroup
                title="Role"
                name="role"
                inputs={[
                  { value: "admin", label: "Admin", defaultChecked: true },
                  { value: "station_owner", label: "Station Owner" },
                  { value: "insights_only", label: "Insights Only" },
                ]}
              />
            </FormContents>

            <FormFooter submitButtonText="Add New User" onClose={onClose} />
          </Form>
        </FormModal>
      )}

      {formData && (
        <div>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Role:</strong> {formData.role}
          </p>
        </div>
      )}

      <button onClick={() => setOpen(true)}>Open</button>
    </div>
  );
};

export default Home;
