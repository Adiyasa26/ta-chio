import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentUser, setUserRole } from './store/action';
import Auth from './routes/auth';
import Home from './routes/home';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  getAccount,
} from './utils/firebase/firebase.utils';
import SignUpForm from './components/regis-form';

function App() {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.userData);

  const currentUser = useSelector(state => state.userData.currentUser);

  useEffect(() => {
    const getAccountsData = async () => {
      const accountsDataMap = await getAccount();
      for (let userCount = 0; userCount < accountsDataMap.length; userCount++) {
        if (
          accountsDataMap[userCount][0] === currentUser.uid &&
          accountsDataMap[userCount][1].role &&
          accountsDataMap[userCount][1].role === 'admin'
        ) {
          dispatch(setUserRole(accountsDataMap[userCount][1].role));
          break;
        } else if (
          accountsDataMap[userCount][0] === currentUser.uid &&
          accountsDataMap[userCount][1].role &&
          accountsDataMap[userCount][1].role === 'dokter'
        ) {
          dispatch(setUserRole(accountsDataMap[userCount][1].role));
          break;
        } else if (
          accountsDataMap[userCount][0] === currentUser.uid &&
          accountsDataMap[userCount][1].role &&
          accountsDataMap[userCount][1].role === 'pasien'
        ) {
          dispatch(setUserRole(accountsDataMap[userCount][1].role));
          break;
        }
      }
    };
    if (currentUser) {
      getAccountsData();
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      {currentUser ? ( 
        <Route path="/home/*" element={<Home />} />
      ) : (
        <Route index element={<Auth />} />
      )}
      {currentUser && userData.userRole === 'admin' ? (
        <Route path="/home/regis" element={<SignUpForm />} />
      ) : (
        <Route index element={<Auth />} />
      )}
    </Routes>
  );
}

export default App;
