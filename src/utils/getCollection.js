import { ref, watchEffect } from 'vue'
import { db } from '../firebase/config'
import {
    collection,
    query,
    orderBy,
    where,
    onSnapshot,
} from 'firebase/firestore'

const getCollection = (collectionName, field, queryData) => {
    const invoices = ref([])
    const error = ref(null)

    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, orderBy(field, 'desc'), where(...queryData))

    const unsub = onSnapshot(
        q,
        (snap) => {
            const data = []
            snap.docs.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            })
            invoices.value = data
            error.value = null
        },
        (err) => {
            error.value = err.message
        },
    )

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { invoices, error }
}

export default getCollection
