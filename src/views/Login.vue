<template>
    <div class="form-wrapper">
        <form @submit.prevent="handleLogin">
            <h2 class="form-wrapper__title">Login</h2>
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
            <button class="btn btn--purple" v-if="!isPending">Login</button>
            <button class="btn btn--purple" v-if="isPending" disabled>
                Logging in...
            </button>
        </form>
        <p class="form-wrapper__link">
            Not a member?
            <router-link :to="{ name: 'Signup' }">Sign up</router-link>
        </p>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '../utils/useLogin'

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const { error, login, isPending } = useLogin()
        const router = useRouter()

        const handleLogin = async () => {
            await login(email.value, password.value)

            if (!error.value) {
                router.push({ name: 'Home' })
            }
        }

        return { email, password, error, isPending, handleLogin }
    },
}
</script>
