import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            invoiceModal: null,
        }
    },
    mutations: {
        TOGGLE_INVOICE(state) {
            state.invoiceModal = !state.invoiceModal
        },
    },
    actions: {},
    modules: {},
})
