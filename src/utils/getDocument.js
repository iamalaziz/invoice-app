import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { doc, onSnapshot } from 'firebase/firestore';

const getDocument = (collection, id) => {
  const invoice = ref(null);
  const error = ref(null);

  const documentRef = doc(db, collection, id);

  const unsub = onSnapshot(
    documentRef,
    (doc) => {
      if (doc.exists()) {
        invoice.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "That invoice doesn't exist";
      }
    },
    (err) => {
      error.value = err.message;
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { invoice, error };
};

export default getDocument;
