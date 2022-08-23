import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDiagnose } from '../../utils/firebase/firebase.utils';
import { setAllDiagnose } from '../../store/action';

import './style.scss';

const AskDoctor = () => {
  const dispatch = useDispatch();

  const diagnoseData = useSelector(state => state.diagnoseData);
  const userData = useSelector(state => state.userData);

  useEffect(() => {
    const getDiagnosesData = async () => {
      const diagnoseDataMap = await getDiagnose();
      dispatch(setAllDiagnose(diagnoseDataMap));
    };
    getDiagnosesData();
  }, [dispatch]);

  return (
    <div className="ask-doctor--container">
      {diagnoseData.map(data => {
        const getDate = data[1].createdAt.toDate();

        const date =
          getDate.getDate().toString() +
          '/' +
          getDate.getMonth().toString() +
          '/' +
          getDate.getFullYear().toString();

        return (
          <>
            {userData.currentUser.email === data[1].emailReceiver ? (
              <>
                <h2 className="tanggal">{date}</h2>
                <h2 className="kategori">{data[1].expert}</h2>
                <h1 className="sender">{data[1].emailSender}</h1>
                <p className="diagnose-result">{data[1].diagnose}</p>
              </>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default AskDoctor;
