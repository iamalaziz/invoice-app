<template>
    <div class="container">
        <div :class="{ 'modal-overlay': newInvoice }">
            <transition name="invoice-modal">
                <invoice-modal v-if="newInvoice" @close="toggleInvoiceModal" />
            </transition>
        </div>
        <div class="header">
            <div class="header__invoices">
                <h1>Invoices</h1>
                <p class="header__invoices__total">
                    There are {{ invoices.length }} total invoices
                </p>
                <p class="header__invoices__total--short">
                    {{ invoices.length }} invoices
                </p>
            </div>
            <div class="header__filter">
                <filter-by-status @get-statuses="changeStatuses" />
            </div>
            <button
                class="header__button btn btn--purple"
                type="button"
                @click="toggleInvoiceModal"
            >
                <img src="../assets/icon-plus.svg" alt="add icon" />New Invoice
            </button>
        </div>
        <invoices-list :invoices="filteredInvoices" :error="error" />
    </div>
</template>

<script>
import InvoiceModal from '../components/InvoiceModal.vue'
import InvoicesList from '../components/InvoicesList.vue'
import FilterByStatus from '../components/FilterByStatus.vue'
import getCollection from '../utils/getCollection'
import getUser from '../utils/getUser'

import { computed, ref } from 'vue'

export default {
    name: 'Home',
    components: { InvoiceModal, InvoicesList, FilterByStatus },
    setup() {
        const newInvoice = ref(false)
        const { user } = getUser()
        const { invoices, error } = getCollection('invoices', 'timestamp', [
            'userId',
            '==',
            user.value.uid,
        ])
        const checkedStatuses = ref([])

        const toggleInvoiceModal = () => {
            newInvoice.value = !newInvoice.value
        }

        const changeStatuses = (statuses) => {
            checkedStatuses.value = statuses
        }

        const filteredInvoices = computed(() => {
            if (checkedStatuses.value.length == 0) return invoices.value

            return invoices.value.filter((invoice) =>
                checkedStatuses.value.includes(invoice.invoiceStatus),
            )
        })

        return {
            newInvoice,
            toggleInvoiceModal,
            invoices,
            error,
            checkedStatuses,
            filteredInvoices,
            changeStatuses,
        }
    },
}
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.invoice-modal-enter-active,
.invoice-modal-leave-active {
    transition: 0.4s ease all;
}
.invoice-modal-enter-from,
.invoice-modal-leave-to {
    transform: translateX(-660px);
}

.container {
    margin: 0 auto;
    padding: 20px;
    max-width: 700px;
    width: 100%;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 50px;

    @media (min-width: 900px) {
        margin: 50px 0;
    }

    &__button {
        display: flex;
        gap: 15px;
        align-items: center;
        padding: 10px 15px 10px 10px;

        & img {
            background-color: #fff;
            border-radius: 50%;
            padding: 10px;
        }
    }

    &__invoices {
        flex: 2;

        h1 {
            font-weight: 700;
            font-size: 1.1rem;

            @media (min-width: 700px) {
                font-size: 2rem;
            }
        }

        p {
            font-size: 0.8rem;
            margin-top: 5px;
        }

        &__total {
            display: none;

            @media (min-width: 900px) {
                display: block;
            }

            &--short {
                @media (min-width: 900px) {
                    display: none;
                }
            }
        }
    }

    &__filter {
        flex: 1;
    }
}
</style>
