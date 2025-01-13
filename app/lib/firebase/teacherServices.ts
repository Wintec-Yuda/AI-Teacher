import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { auth, db } from './firebase';

const classesCollection = collection(db, 'classes');
const teacherServices = {

  // Menambahkan kelas baru, dengan mengambil teacherId dari user yang sedang login
  addClass: async (name: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return { error: 'User is not logged in' };
      }

      const teacherId = user.uid; // Mengambil teacherId dari user yang sedang login

      const docRef = await addDoc(classesCollection, {
        name,
        teacherId,
        createdAt: new Date(),
      });

      return { id: docRef.id, message: 'Class added successfully!' };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Mendapatkan daftar kelas
  getClasses: async () => {
    try {
      const q = query(classesCollection);
      const querySnapshot = await getDocs(q);
      const classes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return classes;
    } catch (error: any) {
      return { error: error.message };
    }
  }
}

export default teacherServices;
