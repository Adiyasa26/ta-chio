import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { createDoctorDiagnose } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input';
import Button from '../button';

import './style.scss';

const defaultFormFields = {
  email: '',
  diagnose: '',
};

const RespondPatient = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, diagnose } = formFields;

  const userData = useSelector(state => state.userData);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await createDoctorDiagnose(
        userData.currentUser.uid,
        userData.currentUser.email,
        userData.userExpert,
        email,
        diagnose
      );
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(email, diagnose);

  return (
    <div className="patient--container">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <textarea
          required
          name="diagnose"
          onChange={handleChange}
          value={diagnose}
        />

        <Button type="submit">Send Diagnose</Button>
      </form>
    </div>
  );
};

export default RespondPatient;
