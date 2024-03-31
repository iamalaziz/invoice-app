import { createStore } from 'vuex'
import db from '../firebase/firebaseInit'
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { getDocs } from 'firebase/firestore'

export default createStore({
    state() {
        return {
            invoiceModal: null,
            modal: null,
            invoiceData: [],
            invoicesLoaded: null,
            currentInvoice: null,
            editInvoice: null,
            loadingInvoices: null,
        }
    },
    mutations: {
        TOGGLE_INVOICE(state) {
            state.invoiceModal = !state.invoiceModal
        },
        TOGGLE_MODAL(state) {
            state.modal = !state.modal
        },
        SET_INVOICE_DATA(state, payload) {
            state.invoiceData = [...payload]
        },
        INVOICES_LOADED(state) {
            state.invoicesLoaded = true
        },
        SET_CURRENT_INVOICE(state, payload) {
            state.currentInvoice = state.invoiceData.find(
                i => i.invoiceId === payload
            )
            // localStorage.setItem('currentInvoice', JSON.stringify(state.currentInvoice));
        },
        TOGGLE_EDIT_INVOICE(state) {
            state.editInvoice = !state.editInvoice
        },
        DELETE_INVOICE(state, payload) {
            state.invoiceData = state.invoiceData.filter(
                (invoice) => invoice.docId !== payload,
            )
        },
        UPDATE_STATUS_TO_PAID(state, payload) {
            state.invoiceData.forEach((invoice) => {
                if (invoice.docId === payload) {
                    invoice.invoicePaid = true
                    invoice.invoicePending = false
                }
            })
        },
        UPDATE_STATUS_TO_PENDING(state, payload) {
            state.invoiceData.forEach((invoice) => {
                if (invoice.docId === payload) {
                    invoice.invoicePaid = false
                    invoice.invoicePending = true
                    invoice.invoiceDraft = false
                }
            })
        },
    },
    actions: {
        async GET_INVOICES({ commit, state }) {
            state.loadingInvoices = true
            const ref = collection(db, 'invoices')
            const querySnapshot = await getDocs(ref)
            const res = querySnapshot.docs.map((d) => ({
                docId: d.id,
                ...d.data(),
            }))
            commit('SET_INVOICE_DATA', res)
            commit('INVOICES_LOADED')
            state.loadingInvoices = false
        },
        async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
            commit('DELETE_INVOICE', docId)
            await dispatch('GET_INVOICES')
            commit('TOGGLE_INVOICE')
            commit('TOGGLE_EDIT_INVOICE')
            commit('SET_CURRENT_INVOICE', routeId)
        },
        async DELETE_INVOICE({ commit }, docId) {
            const invoiceRef = doc(db, 'invoices', docId)
            await deleteDoc(invoiceRef)
            commit('DELETE_INVOICE', docId)
        },
        async UPDATE_STATUS_TO_PAID({ commit }, docId) {
            const invoiceRef = doc(db, 'invoices', docId)
            await updateDoc(invoiceRef, {
                invoicePaid: true,
                invoicePending: false,
            })
            commit('UPDATE_STATUS_TO_PAID', docId)
        },
        async UPDATE_STATUS_TO_PENDING({ commit }, docId) {
            const invoiceRef = doc(db, 'invoices', docId)
            await updateDoc(invoiceRef, {
                invoicePaid: false,
                invoicePending: true,
                invoiceDraft: false,
            })
            commit('UPDATE_STATUS_TO_PENDING', docId)
        },
    },
})
