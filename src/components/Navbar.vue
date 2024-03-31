<template>
    <div class="navbar">
        <div class="navbar__logo">
            <router-link :to="{ name: 'Home' }"
                ><img src="../assets/logo.svg" alt="logo"
            /></router-link>
        </div>
        <div class="navbar__items">
            <div class="navbar__toggle">
                <button @click="toggleTheme">
                    <img
                        v-if="!darkMode"
                        src="../assets/icon-moon.svg"
                        alt="darkmode icon"
                    />
                    <img
                        v-else
                        src="../assets/icon-sun.svg"
                        alt="lightmode icon"
                    />
                </button>
            </div>
            <div class="navbar__logout" v-if="user">
                <button class="btn btn--purple" @click="handleLogout">
                    <img src="../assets/sign-out-alt.svg" alt="sign-out" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import useLogout from '../utils/useLogout'
import getUser from '../utils/getUser'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
    setup() {
        const { logout, error } = useLogout()
        const { user } = getUser()
        const router = useRouter()
        const theme = ref(null)
        const darkMode = ref(null)

        const handleLogout = async () => {
            await logout()
            if (!error.value) {
                router.push({ name: 'Login' })
            }
        }

        const toggleTheme = () => {
            if (theme.value == 'dark') {
                theme.value = 'light'
                document.documentElement.setAttribute('data-theme', 'light')
                localStorage.setItem('theme', 'light')
            } else {
                theme.value = 'dark'
                document.documentElement.setAttribute('data-theme', 'dark')
                localStorage.setItem('theme', 'dark')
            }
            darkMode.value = !darkMode.value
        }

        onMounted(() => {
            theme.value = localStorage.getItem('theme')
            if (theme.value) {
                document.documentElement.setAttribute('data-theme', theme.value)
                if (theme.value == 'dark') {
                    darkMode.value = true
                }
            }
        })

        return { handleLogout, user, darkMode, toggleTheme }
    },
}
</script>

<style lang="scss" scoped>
.navbar {
    background-color: var(--background-nav-color);
    min-height: 90px;
    min-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    position: fixed;

    @media (min-width: 900px) {
        min-height: 100%;
        min-width: 90px;
        border-radius: 0 20px 20px 0;
        flex-direction: column;
    }

    &__logo {
        border-radius: 0 20px 20px 0;
        background-color: var(--button-color-primary);
        width: 90px;
        height: 90px;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            height: 50%;
            width: 100%;
            left: 0;
            bottom: 0;
            background-color: var(--button-color-primary-light);
            border-radius: 20px 0px;
            transition: 0.2s;
        }

        &:hover::after {
            height: 80%;
        }

        & img {
            position: relative;
            z-index: 1;
            padding: calc(100% / 3);
            transition: 0.2s;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    &__logout {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 30px;
        border-left: 1px solid var(--font-color-tertiary);
        height: 90px;

        @media (min-width: 900px) {
            padding: 30px 0;
            border-left: 0;
            border-top: 1px solid var(--font-color-tertiary);
            width: 90px;
        }

        & button {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            padding: 0;
        }
    }

    &__items {
        display: flex;
        align-items: center;

        @media (min-width: 900px) {
            flex-direction: column;
        }
    }

    &__toggle {
        padding: 0 30px;

        @media (min-width: 900px) {
            padding: 30px 0;
        }

        & button {
            cursor: pointer;
            border: none;
            background-color: transparent;
        }

        &:hover {
            opacity: 0.7;
        }
    }
}
</style>
