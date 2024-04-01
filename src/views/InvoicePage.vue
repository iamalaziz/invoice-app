<template>
    <div class="container">
        <div class="container-invoice">
            <router-link :to="{ name: 'Home' }"
                ><img
                    src="../assets/icon-arrow-left.svg"
                    alt="go back icon"
                />Go back</router-link
            >
            <div v-if="invoice && ownership">
                <div class="invoice-header">
                    <div class="invoice-header__status">
                        <span>Status</span>
                        <span
                            class="status"
                            :class="{
                                draft: invoice.invoiceStatus == 'draft',
                                pending: invoice.invoiceStatus == 'pending',
                                paid: invoice.invoiceStatus == 'paid',
                            }"
                            >{{ invoice.invoiceStatus }}</span
                        >
                    </div>
                    <div class="invoice-header__buttons">
                        <button
                            class="btn btn--light-gray"
                            @click="toggleInvoiceModal"
                        >
                            Edit
                        </button>
                        <button class="btn btn--error" @click="toggleModal">
                            Delete
                        </button>
                        <button
                            class="btn btn--purple"
                            @click="updateStatus"
                            v-if="invoice.invoiceStatus == 'pending'"
                        >
                            Mark as Paid
                        </button>
                    </div>
                </div>
                <div class="invoice-body">
                    <div class="invoice-body__from">
                        <div>
                            <h3 class="invoice-body__id">
                                <span class="hash">#</span>{{ invoice.id }}
                            </h3>
                            <p>{{ invoice.projectDescription }}</p>
                        </div>
                        <div>
                            <p>{{ invoice.billerStreetAddress }}</p>
                            <p>{{ invoice.billerCity }}</p>
                            <p>{{ invoice.billerPostCode }}</p>
                            <p>{{ invoice.billerCountry }}</p>
                        </div>
                    </div>
                    <div class="invoice-body__to">
                        <div>
                            <div>
                                <h3 class="invoice-body__heading">
                                    Invoice Date
                                </h3>
                                <p class="invoice-body__text">
                                    {{ invoice.invoiceDate }}
                                </p>
                            </div>
                            <div>
                                <h3 class="invoice-body__heading">
                                    Payment Due
                                </h3>
                                <p class="invoice-body__text">
                                    {{ invoice.paymentDue }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 class="invoice-body__heading">Bill To</h3>
                            <p class="invoice-body__text">
                                {{ invoice.clientName }}
                            </p>
                            <p>{{ invoice.clientStreetAddress }}</p>
                            <p>{{ invoice.clientCity }}</p>
                            <p>{{ invoice.clientPostCode }}</p>
                            <p>{{ invoice.clientCountry }}</p>
                        </div>
                        <div>
                            <h3 class="invoice-body__heading">Sent to</h3>
                            <p class="invoice-body__text">
                                {{ invoice.clientEmail }}
                            </p>
                        </div>
                    </div>
                    <div class="invoice-body__item-list">
                        <div class="item-list__header">
                            <p>Item Name</p>
                            <p>QTY.</p>
                            <p>Price</p>
                            <p>Total</p>
                        </div>
                        <div
                            v-for="item in invoice.invoiceItemList"
                            :key="item.id"
                            class="item-list__item"
                        >
                            <p>
                                {{ item.itemName }}
                                <span class="item-list__item-mobile"
                                    >{{ item.qty }} x ${{ item.price }}</span
                                >
                            </p>
                            <p class="item-list__item-desktop">
                                {{ item.qty }}
                            </p>
                            <p class="item-list__item-desktop">
                                {{ item.price }}
                            </p>
                            <p>${{ item.total }}</p>
                        </div>
                        <div class="item-list__footer">
                            <p>Amount Due</p>
                            <p>${{ invoice.invoiceTotal }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="error">{{ error }}</div>
            <div v-if="invoice && !ownership">
                That invoice doesn't exist or you have insufficient permissions
                to view it.
            </div>
        </div>
        <div v-if="invoice" class="mobile-buttons">
            <button class="btn btn--light-gray" @click="toggleInvoiceModal">
                Edit
            </button>
            <button class="btn btn--error" @click="toggleModal">Delete</button>
            <button
                class="btn btn--purple"
                @click="updateStatus"
                v-if="invoice.invoiceStatus == 'pending'"
            >
                Mark as Paid
            </button>
        </div>
        <transition name="modal">
            <modal v-if="showModal">
                <template v-slot:header>
                    <h3>Confirm Deletion</h3>
                </template>
                <template v-slot:body>
                    <p>
                        Are you sure you want to delete invoice #{{
                            invoice.id
                        }}? This action cannot be undone.
                    </p>
                </template>
                <template v-slot:footer>
                    <button class="btn btn--light-gray" @click="toggleModal">
                        Close
                    </button>
                    <button class="btn btn--error" @click="deleteInvoice">
                        Delete
                    </button>
                </template>
            </modal>
        </transition>
        <div :class="{ 'modal-overlay': showInvoiceModal }">
            <transition name="invoice-modal">
                <invoice-modal
                    v-if="showInvoiceModal"
                    @close="toggleInvoiceModal"
                    :edit="true"
                    :invoice="invoice"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import getDocument from '../utils/getDocument'
import useDocument from '../utils/useDocument'
import Modal from '../components/Modal.vue'
import InvoiceModal from '../components/InvoiceModal.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import getUser from '../utils/getUser'

export default {
    name: 'InvoicePage',
    props: ['id'],
    components: { Modal, InvoiceModal },
    setup(props) {
        const { invoice, error } = getDocument('invoices', props.id)
        const { updateDoc, deleteDoc } = useDocument('invoices', props.id)
        const showModal = ref(false)
        const showInvoiceModal = ref(false)
        const router = useRouter()
        const { user } = getUser()

        const ownership = computed(
            () =>
                invoice.value &&
                user.value &&
                user.value.uid == invoice.value.userId,
        )

        const toggleModal = () => {
            showModal.value = !showModal.value
        }

        const toggleInvoiceModal = () => {
            showInvoiceModal.value = !showInvoiceModal.value
        }

        const updateStatus = async () => {
            await updateDoc({
                invoiceStatus: 'paid',
            })
        }

        const deleteInvoice = async () => {
            await deleteDoc()
            router.push({ name: 'Home' })
        }

        router.afterEach((to, from) => {
            if (from.name === 'InvoicePage' && showModal.value) {
                to.meta.transition = 'fade'
                showModal.value = false
            }
        })

        return {
            invoice,
            error,
            ownership,
            updateStatus,
            deleteInvoice,
            showModal,
            toggleModal,
            showInvoiceModal,
            toggleInvoiceModal,
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;

    &-invoice {
        margin: 120px auto 50px auto;
        padding: 20px;
        max-width: 700px;

        @media (min-width: 900px) {
            margin-top: 50px;
        }

        a {
            text-decoration: none;
            color: inherit;
            font-size: 0.75rem;
            font-weight: 700;
            transition: 0.2s;

            img {
                padding-right: 15px;
            }

            &:hover {
                color: var(--button-color-primary);
            }
        }
    }
}

.invoice-header,
.invoice-body {
    background-color: var(--background-box-color);
    border-radius: 10px;
    margin-top: 15px;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    color: var(--font-color-secondary);
    font-size: 0.75rem;

    p {
        line-height: 2;
    }

    &__heading {
        font-weight: 300;
        font-size: 0.75rem;
        padding-bottom: 15px;
    }

    &__text,
    &__id {
        color: var(--font-color-primary);
        font-weight: 700;
        font-size: 0.9rem;
        padding-bottom: 15px;
    }
}

.invoice-header {
    align-items: center;

    &__status {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        width: 100%;

        @media (min-width: 700px) {
            width: auto;
        }
    }

    &__buttons {
        display: none;

        @media (min-width: 700px) {
            display: block;
        }
    }
}

.invoice-body {
    flex-direction: column;
    gap: 20px;

    &__from {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 20px;

        @media (min-width: 700px) {
            flex-direction: row;
        }

        .hash {
            color: var(--font-color-tertiary);
            font-weight: 700;
        }
    }

    &__to {
        display: flex;
        flex-wrap: wrap;
        margin: 20px 0;

        & > * {
            flex: 1;
        }

        & > *:last-child {
            flex-basis: 100%;

            @media (min-width: 700px) {
                flex: 1;
            }
        }
    }

    &__item-list {
        background-color: var(--table-bg-color-primary);
        border-radius: 10px;
        overflow: hidden;

        .item-list {
            &__header,
            &__item {
                display: flex;
                align-items: center;
                margin: 25px;

                p:first-child {
                    flex: 2;
                    text-align: left;
                }

                p {
                    flex: 1;
                    text-align: right;
                }

                &-desktop {
                    display: none;

                    @media (min-width: 700px) {
                        display: inline;
                    }
                }

                &-mobile {
                    display: block;
                    color: var(--font-color-secondary);

                    @media (min-width: 700px) {
                        display: none;
                    }
                }
            }

            &__header {
                display: none;

                @media (min-width: 700px) {
                    display: flex;
                }
            }

            &__item {
                font-weight: 700;

                p:first-child,
                p:last-child {
                    color: var(--font-color-primary);
                }
            }

            &__footer {
                display: flex;
                justify-content: space-between;
                background-color: var(--table-bg-color-secondary);
                padding: 25px;
                color: var(--table-color);
                font-weight: 700;
                align-items: center;
                font-size: 0.7rem;

                p:last-child {
                    font-size: 1.4rem;
                }
            }
        }
    }
}

.mobile-buttons {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 25px;
    background-color: var(--background-box-color);
    box-shadow: rgba(73, 73, 94, 0.2) 0px 7px 29px 0px;
    text-align: center;

    @media (min-width: 700px) {
        display: none;
    }
}

button:not(:last-child) {
    margin-right: 5px;
}

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

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.invoice-modal-enter-active,
.invoice-modal-leave-active {
    transition: 0.4s ease all;
}
.invoice-modal-enter-from,
.invoice-modal-leave-to {
    transform: translateX(-660px);
}
</style>
