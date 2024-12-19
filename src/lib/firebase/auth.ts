import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  // const result = await signInWithPopup(auth, provider);
  // const user = result.user;
  await signInWithPopup(auth, provider);

  // Add user to firestore
};

export const doSignOut = (): Promise<void> => {
  return auth.signOut();
};

export const doPasswordReset = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string): Promise<void> => {
  if (!auth.currentUser) throw new Error("No current user available");
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = (): Promise<void> => {
  if (!auth.currentUser) throw new Error("No current user available");
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
