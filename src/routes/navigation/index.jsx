import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SignOutUser } from '../../utils/firebase/firebase.utils';

import './style.scss';

const Navigation = () => {
  const userData = useSelector(state => state.userData);

  const navigate = useNavigate();

  const handleLogout = () => {
    SignOutUser();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="page--container">
      <div className="navigation--container">
        <Link to="/">E-Hospital</Link>
        <div className="menu--container">
          {userData.userRole && userData.userRole === 'admin' ? (
            <Link to="/home/regis">Add User</Link>
          ) : null}
          {userData.currentUser ? (
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          ) : null}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
