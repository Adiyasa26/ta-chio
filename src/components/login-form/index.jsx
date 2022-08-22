import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  signInUserAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import Button from '../button';
import FormInput from '../form-input';

import './style.scss';


const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await signInUserAuthWithEmailAndPassword(email, password);
      resetFormFields();
      navigate('/home/')
    } catch (error) {
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        alert('Invalid email or password');
      }
      console.log(error);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            name="email"
            value={email}
            onChange={handleChange}
          />

          <FormInput
            label="Password"
            type="password"
            required
            name="password"
            value={password}
            onChange={handleChange}
          />

          <div className="buttons-container">
            <Button type="submit">Masuk</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
