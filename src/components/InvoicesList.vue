<template>
    <div v-if="error">{{ error }}</div>
    <div v-if="invoices.length">
        <transition-group name="list">
            <div v-for="(invoice, index) in invoices" :key="index">
                <router-link
                    :to="{ name: 'InvoicePage', params: { id: invoice.id } }"
                >
                    <div class="invoice-box">
                        <div class="invoice-box__left">
                            <p class="invoice-box__id">
                                <span class="invoice-box__id-hash">#</span
                                >{{ invoice.id }}
                            </p>
                            <p class="invoice-box__payment-due">
                                Due {{ invoice.paymentDue }}
                            </p>
                            <p class="invoice-box__client-name">
                                {{ invoice.clientName }}
                            </p>
                        </div>
                        <div class="invoice-box__right">
                            <p class="invoice-box__total">
                                ${{ invoice.invoiceTotal }}
                            </p>
                            <p
                                class="status"
                                :class="{
                                    draft: invoice.invoiceStatus == 'draft',
                                    pending: invoice.invoiceStatus == 'pending',
                                    paid: invoice.invoiceStatus == 'paid',
                                }"
                            >
                                {{ invoice.invoiceStatus }}
                            </p>
                        </div>
                    </div>
                </router-link>
            </div>
        </transition-group>
    </div>
    <div v-else class="empty">
        <img src="../assets/illustration-empty.svg" alt="no invoices" />
        <h2>There is nothing here</h2>
        <p>
            Create an invoice by clicking the new invoice button and get started
        </p>
    </div>
</template>

<script>
export default {
    name: 'InvoicesList',
    props: ['invoices', 'error'],
}
</script>

<style lang="scss" scoped>
.invoice-box {
    background-color: var(--background-box-color);
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 25px;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    cursor: pointer;
    transition: 0.2s;

    @media (min-width: 700px) {
        background-image: url('../assets/icon-arrow-right.svg');
        background-repeat: no-repeat;
        background-position: center right 25px;
        padding: 15px 50px 15px 25px;
    }

    &:hover {
        box-shadow: 0 0 0 1px var(--border-color-secondary);
    }

    &__left,
    &__right {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        @media (min-width: 700px) {
            flex-direction: row;
        }
    }

    &__left {
        flex-basis: 70%;
        gap: 25px;

        @media (min-width: 700px) {
            gap: 0;
        }

        & > *:first-child {
            flex: 1;
        }

        & > * {
            flex: 2;
        }
    }

    &__right {
        flex-basis: 30%;
        align-items: flex-end;
        gap: 25px;

        @media (min-width: 700px) {
            align-items: center;
        }
    }

    &__id {
        font-weight: 700;

        &-hash {
            color: var(--font-color-tertiary);
            font-weight: 700;
        }
    }

    &__payment-due,
    &__client-name {
        color: var(--font-color-secondary);
    }

    &__total {
        font-size: 1rem;
        font-weight: 700;
    }
}

a {
    color: inherit;
    text-decoration: inherit;
}

.empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 30px;
}

.list-enter-active,
.list-leave-active {
    transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
