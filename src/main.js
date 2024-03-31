import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});


// import { createApp } from 'vue'
// import store from './store'
// import router from './router/index'
// import App from './App.vue'

// createApp(App).use(store).use(router).mount('#app')
