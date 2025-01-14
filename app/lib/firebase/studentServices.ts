import { randomUUID } from "crypto";
import { db } from "./firebase"; // Impor instance Firestore
import { auth } from "./firebase"; // Impor instance auth
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  arrayUnion,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const studentCollection = collection(db, "students");
const classCollection = collection(db, "classes");
const materialCollection = collection(db, "materials");

const studentService = {
  getStudentMaterials: async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return { error: "User is not logged in" };
      }

      const studentId = user.uid; // Ambil UID siswa dari user login

      // Cari dokumen siswa berdasarkan UID
      const studentQuery = query(
        studentCollection,
        where("uid", "==", studentId)
      );
      const studentSnapshot = await getDocs(studentQuery);

      if (studentSnapshot.empty) {
        return { error: "Student not found" };
      }

      const studentDoc = studentSnapshot.docs[0];
      const studentData = studentDoc.data();

      console.log("Student Data:", studentData);

      return studentData;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Update data siswa dengan menambahkan independentMaterialIds
  addStudentMaterial: async (
    content: string,
    level: number,
    schoolLevel: string,
    topic: string,
    language: string
  ) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return { error: "User is not logged in" };
      }

      const studentId = user.uid; // Ambil UID siswa dari user login
      const materialUid = randomUUID();

      await addDoc(materialCollection, {
        contents: arrayUnion(content),
        level,
        schoolLevel,
        topic,
        language,
        uid: materialUid,
      });

      // Cari dokumen siswa berdasarkan UID
      const studentQuery = query(
        studentCollection,
        where("uid", "==", studentId)
      );
      const studentSnapshot = await getDocs(studentQuery);

      if (studentSnapshot.empty) {
        return { error: "Student not found" };
      }

      // Perbarui dokumen siswa dengan menambahkan UID material ke array 'materials'
      const studentDocRef = studentSnapshot.docs[0].ref;
      await updateDoc(studentDocRef, {
        materials: arrayUnion(materialUid), // Tambahkan UID material tanpa menimpa data sebelumnya
      });

      return { message: "Materials added and student updated successfully!" };
    } catch (error: any) {
      console.error("Error adding student material:", error);
      return { error: error.message };
    }
  },

  updateStudentMaterial: async (content: string) => {
    try {
      
    } catch (error: any) {
      console.error("Error adding student material:", error);
      return { error: error.message };
    }
  }

  // Menambahkan siswa ke kelas dengan kode kelas
  // joinClass: async (studentId: string, classCode: string) => {
  //   try {
  //     const studentDocRef = doc(studentsCollection, studentId);
  //     const studentSnap = await getDoc(studentDocRef);

  //     if (!studentSnap.exists()) {
  //       return { error: "Student not found" };
  //     }

  //     // Cek jika siswa sudah bergabung dengan kelas ini
  //     const joinedClassSnap = await getDoc(
  //       doc(studentJoinedClassesCollection, studentId)
  //     );
  //     const studentJoinedClasses = joinedClassSnap.exists()
  //       ? joinedClassSnap.data().classes
  //       : [];

  //     if (studentJoinedClasses.includes(classCode)) {
  //       return { error: "Student is already joined to this class" };
  //     }

  //     // Menambahkan kelas ke daftar kelas yang diikuti oleh siswa
  //     studentJoinedClasses.push(classCode);

  //     // Menyimpan data joinedClasses ke koleksi studentJoinedClasses
  //     await setDoc(doc(studentJoinedClassesCollection, studentId), {
  //       studentId,
  //       classes: studentJoinedClasses,
  //     });

  //     return { message: `Student successfully joined class ${classCode}` };
  //   } catch (error: any) {
  //     return { error: error.message };
  //   }
  // },
};

export default studentService;
