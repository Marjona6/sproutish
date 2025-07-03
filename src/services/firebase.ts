import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your Firebase configuration from google-services.json
const firebaseConfig = {
  apiKey: 'AIzaSyD5JvbqZ0g8i04e9rZkcS_KWKvPH1Koyy4',
  authDomain: 'sproutish-app.firebaseapp.com',
  projectId: 'sproutish-app',
  storageBucket: 'sproutish-app.firebasestorage.app',
  messagingSenderId: '961139816561',
  appId: '1:961139816561:android:50fac0dda3bd0ad54b83d0',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// For development, you can uncomment these to use Firebase emulators
// if (__DEV__) {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export {app, auth, db, googleProvider};
