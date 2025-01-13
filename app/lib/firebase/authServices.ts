// services/authService.ts
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const authService = {
  login: async (username: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;
      return { user, message: "Login successful!" };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  register: async (
    name: string,
    role: string,
    username: string,
    password: string
  ) => {
    try {
      // Membuat akun menggunakan Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;

      console.log("User registered:", user);
      

      // Menentukan collection berdasarkan role
      const collectionName = role === "student" ? "students" : "teachers";

      // Menambahkan data tambahan ke Firestore
      await addDoc(collection(db, collectionName), {
        uid: user.uid, // UID dari Firebase Auth
        name,
        role,
        createdAt: new Date().toISOString(),
      });

      return { user, message: "Registration successful!" };
    } catch (error: any) {
      return { error: error.message };
    }
  },
};

export default authService;
