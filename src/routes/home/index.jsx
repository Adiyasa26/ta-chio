import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navigation from '../navigation';
import ListUser from '../../components/list-user';
import AskDoctor from '../../components/ask-doctor';
import RespondPatient from '../../components/resspond-patient';
import Auth from '../auth';

const Home = () => {
  const userRole = useSelector(state => state.userData.userRole);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {userRole && userRole === 'admin' ? (
          <Route index element={<ListUser />} />
        ) : userRole && userRole === 'pasien' ? (
          <Route index element={<AskDoctor />} />
        ) : userRole && userRole === 'dokter' ? (
          <Route index element={<RespondPatient />} />
        ) : (
          <Route index element={<Auth />} />
        )}
      </Route>
    </Routes>
  );
};

export default Home;
