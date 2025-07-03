import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {auth} from './firebase';
import {signInWithCredential, GoogleAuthProvider} from 'firebase/auth';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId:
    '961139816561-9atb36tb3fd76co3m8faiqdue4a5727s.apps.googleusercontent.com',
  offlineAccess: true,
});

export const googleSignIn = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices();

    // Sign in and get user info
    const userInfo = await GoogleSignin.signIn();

    // Get the ID token
    const {accessToken} = await GoogleSignin.getTokens();

    // Create a Google credential with the access token
    const googleCredential = GoogleAuthProvider.credential(null, accessToken);

    // Sign-in the user with the credential
    const result = await signInWithCredential(auth, googleCredential);

    return result;
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const googleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error: any) {
    console.error('Google Sign-Out Error:', error);
    throw error;
  }
};

export const isSignedIn = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
  } catch (error: any) {
    console.error('Check Sign-In Status Error:', error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    return await GoogleSignin.getCurrentUser();
  } catch (error: any) {
    console.error('Get Current User Error:', error);
    return null;
  }
};
