import { ref } from 'vue'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

const user = ref(auth.currentUser)

onAuthStateChanged(auth, (_user) => {
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser
