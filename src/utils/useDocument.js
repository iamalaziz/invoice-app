import { ref } from 'vue'
import { db } from '../firebase/config'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

const useDocument = (collection, id) => {
    const error = ref(null)

    const docRef = doc(db, collection, id)

    const updateDocFunc = async (updates) => {
        error.value = null

        try {
            await updateDoc(docRef, updates)
        } catch (err) {
            error.value = err.message
        }
    }

    const deleteDocFunc = async () => {
        error.value = null

        try {
            await deleteDoc(docRef)
        } catch (err) {
            error.value = err.message
        }
    }

    return { updateDoc: updateDocFunc, deleteDoc: deleteDocFunc, error }
}

export default useDocument
