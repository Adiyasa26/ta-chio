import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBYIqWZHZO7KfQLqZCEsoXBbwI6tFMO72g',
  authDomain: 'transmetro-e64e4.firebaseapp.com',
  projectId: 'transmetro-e64e4',
  storageBucket: 'transmetro-e64e4.appspot.com',
  messagingSenderId: '474269797795',
  appId: '1:474269797795:web:58fc414f2da8dc9b4c5e16',
};

const app = initializeApp(firebaseConfig);
console.log(app);

export const auth = getAuth();

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getDiagnose = async () => {
  const collectionRef = collection(db, 'diagnose');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => [doc.id, doc.data()]);
};

export const getAccount = async () => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => [doc.id, doc.data()]);
};

export const createDoctorDiagnose = async (
  uid,
  emailSender,
  expert,
  emailReceiver,
  diagnose
) => {
  const createdAt = new Date();
  const uniqueUid =
    uid +
    createdAt.getDate().toString() +
    createdAt.getMonth().toString() +
    createdAt.getFullYear().toString() +
    createdAt.getHours().toString() +
    createdAt.getMinutes().toString() +
    createdAt.getSeconds().toString();
  const diagnoseDocRef = doc(db, 'diagnose', uniqueUid);
  const diagnoseSnapshot = await getDoc(diagnoseDocRef);

  if (!diagnoseSnapshot.exists()) {
    try {
      await setDoc(diagnoseDocRef, {
        emailSender,
        emailReceiver,
        expert,
        diagnose,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the diagnose.', error.message);
    }
  }

  return diagnoseDocRef;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  console.log(additionalInformation);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        displayName,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user.', error.message);
    }
  }

  return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback);
