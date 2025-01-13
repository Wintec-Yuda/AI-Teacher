import { db } from './firebase'; // Impor instance Firestore
import { auth } from './firebase'; // Impor instance auth
import { doc, updateDoc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';

const studentsCollection = collection(db, 'students');
const studentJoinedClassesCollection = collection(db, 'classes');
const studentService = {

  // Update data siswa dengan menambahkan independentMaterialIds
  addStudentMaterial: async (studentId: string, material: string) => {
    try {
      const studentDocRef = doc(studentsCollection, studentId);
      const studentSnap = await getDoc(studentDocRef);

      if (!studentSnap.exists()) {
        return { error: 'Student not found' };
      }

      // Update independentMaterialIds field
      await updateDoc(studentDocRef, {
        independentMaterialIds: [materialId],
      });

      return { message: 'Student materials updated successfully!' };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Menambahkan siswa ke kelas dengan kode kelas
  joinClass: async (studentId: string, classCode: string) => {
    try {
      const studentDocRef = doc(studentsCollection, studentId);
      const studentSnap = await getDoc(studentDocRef);

      if (!studentSnap.exists()) {
        return { error: 'Student not found' };
      }

      // Cek jika siswa sudah bergabung dengan kelas ini
      const joinedClassSnap = await getDoc(doc(studentJoinedClassesCollection, studentId));
      const studentJoinedClasses = joinedClassSnap.exists() ? joinedClassSnap.data().classes : [];

      if (studentJoinedClasses.includes(classCode)) {
        return { error: 'Student is already joined to this class' };
      }

      // Menambahkan kelas ke daftar kelas yang diikuti oleh siswa
      studentJoinedClasses.push(classCode);

      // Menyimpan data joinedClasses ke koleksi studentJoinedClasses
      await setDoc(doc(studentJoinedClassesCollection, studentId), {
        studentId,
        classes: studentJoinedClasses,
      });

      return { message: `Student successfully joined class ${classCode}` };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}

export default studentService;
