<template>
    <header class="flex">
        <div class="branding">
            <img src="../assets/file-invoice-dollar-solid.png" alt="Logo" />
        </div>
        <div class="user-info flex">
            <a href="https://github.com/iamalaziz" target="_blank">
                <img
                    class="user-photo"
                    width="50px"
                    height="50px"
                    src="../assets/profile.jpg"
                    alt="profile photo"
                />
                <p>iamalaziz</p>
            </a>
        </div>
    </header>
</template>

<script>
export default {
    name: 'navigation',
}
</script>

<style>
header {
    z-index: 99;
    justify-content: space-between;
    flex-direction: column;
    background-color: #1e2139;
    @media (min-width: 900px) {
        min-height: 100%;
        min-width: 100px;
        flex-direction: column;
        border-radius: 0 20px 20px 0;
    }

    .branding {
        border-radius: 0 20px 20px 0;
        background-color: #7c5dfa;
        justify-content: center;
        padding: 24px;
        display: flex;
        justify-content: center;
        @media (min-width: 900px) {
            width: 100%;
        }
        img {
            width: auto;
            height: 30px;
        }
    }
    .user-info {
        width: 100%;
        height: 100px;
        border-top: 1px solid rgb(73, 79, 110);
        display: flex;
        align-items: center;
        justify-content: center;
        a {
            flex-direction: column;
            transition: 0.2s all;
            p {
                font-size: 12px;
                text-align: center;
                color: #fff;
            }
        }
    }
    .user-photo {
        border-radius: 50%;
    }
}
</style>
