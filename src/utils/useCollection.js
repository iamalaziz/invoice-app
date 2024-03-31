import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";

const useCollection = (collectionName, docId) => {
  const error = ref(null);

  const addDoc = async (docData) => {
    error.value = null;

    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, docData);
    } catch (err) {
      error.value = err.message;
    }
  };

  return { error, addDoc };
};

export default useCollection;
