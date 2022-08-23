import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import Button from '../button';
import FormInput from '../form-input';

import './style.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  role: '',
  expert: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword, role, expert } =
    formFields;
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const navigate = useNavigate();

  console.log(formFields);

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password do not match!');
      return;
    }

    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      if (role === 'dokter') {
        await createUserDocumentFromAuth(user, {
          displayName,
          role,
          expert,
        });
      } else {
        await createUserDocumentFromAuth(user, { displayName, role });
      }
      resetFormFields();
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('User creation encountered an error', error);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Belum punya akun?</h2>
      <span>Daftarkan dirimu dengan email dan password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nama Lengkap"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <select name="role" value={role} onChange={handleChange}>
          <option value="" disabled>
            Choose User
          </option>
          <option value="dokter">Dokter</option>
          <option value="pasien">Pasien</option>
        </select>

        {role === 'dokter' ? (
          <select name="expert" value={expert} onChange={handleChange}>
            <option value="" disabled>
              Choose Specialist
            </option>
            <option value="neurologists">Neurologists</option>
            <option value="psychiatrists">Psychiatrists</option>
            <option value="pulmonologists">Pulmonologists</option>
          </select>
        ) : null}

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <FormInput
          label="Konfirmasi Password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type="submit">Daftar</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
