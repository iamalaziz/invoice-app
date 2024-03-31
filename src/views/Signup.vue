<template>
    <div class="form-wrapper">
        <form @submit.prevent="handleSignup">
            <h2 class="form-wrapper__title">Signup</h2>
            <label for="displayName">Name:</label>
            <input
                id="displayName"
                type="text"
                placeholder="Name"
                v-model="displayName"
                autocomplete="on"
                required
            />
            <label for="email">Email:</label>
            <input
                id="email"
                type="email"
                placeholder="Email"
                v-model="email"
                autocomplete="on"
                required
            />
            <label for="password">Password:</label>
            <input
                id="password"
                type="password"
                placeholder="Password"
                v-model="password"
                autocomplete="on"
                required
            />
            <div class="form-wrapper__error" v-if="error">{{ error }}</div>
            <button class="btn btn--purple" v-if="!isPending">Sign up</button>
            <button class="btn btn--purple" v-if="isPending" disabled>
                Signing up...
            </button>
        </form>
        <p class="form-wrapper__link">
            Already a member?
            <router-link :to="{ name: 'Login' }">Sign in</router-link>
        </p>
    </div>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../utils/useSignup'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const displayName = ref('')
        const email = ref('')
        const password = ref('')
        const { error, signup, isPending } = useSignup()
        const router = useRouter()

        const handleSignup = async () => {
            await signup(email.value, password.value, displayName.value)

            if (!error.value) {
                router.push({ name: 'Home' })
            }
        }

        return { displayName, email, password, handleSignup, error, isPending }
    },
}
</script>
