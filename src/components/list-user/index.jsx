import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAccount } from '../../utils/firebase/firebase.utils';
import { setAllUser } from '../../store/action';

import './style.scss';

const ListUser = () => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.userData);

  useEffect(() => {
    const getAccountsData = async () => {
      const accountsDataMap = await getAccount();
      dispatch(setAllUser(accountsDataMap));
    };
    if (userData.userRole === 'admin') {
      getAccountsData();
    }
  }, [dispatch, userData.userRole]);

  return (
    <div className="list-user--container">
      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userData.allUser.map(user => {
            return (
              <tr key={user[0]}>
                <td>{user[0]}</td>
                <td>{user[1].displayName}</td>
                <td>{user[1].email}</td>
                <td>{user[1].role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
