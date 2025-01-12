// services/authService.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import auth from './instance';

export const login = async (username: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;
    return { user, message: 'Login successful!' };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const register = async (username: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;
    // Optionally, save user's additional data like name to Firestore
    return { user, message: 'Registration successful!' };
  } catch (error: any) {
    return { error: error.message };
  }
};
