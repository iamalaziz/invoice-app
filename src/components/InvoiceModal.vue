<template>
    <div class="modal-wrapper">
        <form class="modal-inner" @submit.prevent="handleSubmit">
            <h2 v-if="!editInvoice">New Invoice</h2>
            <h2 v-else>Edit #{{ currentInvoice.id }}</h2>
            <fieldset class="modal-inner__bill-from">
                <legend>Bill From</legend>
                <div>
                    <label for="billerStreetAddress">Street Address</label>
                    <input
                        type="text"
                        id="billerStreetAddress"
                        v-model="billerStreetAddress"
                        :required="isRequired"
                    />
                </div>
                <div class="modal-inner__one-block-items">
                    <div>
                        <label for="billerCity">City</label
                        ><input
                            type="text"
                            id="billerCity"
                            v-model="billerCity"
                            :required="isRequired"
                        />
                    </div>
                    <div>
                        <label for="billerPostCode">Post Code</label>
                        <input
                            type="text"
                            id="billerPostCode"
                            v-model="billerPostCode"
                            :required="isRequired"
                        />
                    </div>
                    <div>
                        <label for="billerCountry">Country</label>
                        <input
                            type="text"
                            id="billerCountry"
                            v-model="billerCountry"
                            :required="isRequired"
                        />
                    </div>
                </div>
            </fieldset>
            <fieldset class="modal-inner__bill-to">
                <legend>Bill To</legend>
                <div>
                    <label for="clientName">Client's Name</label>
                    <input
                        type="text"
                        id="clientName"
                        v-model="clientName"
                        :required="isRequired"
                    />
                    <label for="clientEmail">Client's Email</label>
                    <input
                        type="email"
                        id="clientEmail"
                        v-model="clientEmail"
                        :required="isRequired"
                    />
                    <label for="clientStreetAddress">Street Address</label>
                    <input
                        type="text"
                        id="clientStreetAddress"
                        v-model="clientStreetAddress"
                        :required="isRequired"
                    />
                </div>
                <div class="modal-inner__one-block-items">
                    <div>
                        <label for="clientCity">City</label
                        ><input
                            type="text"
                            id="clientCity"
                            v-model="clientCity"
                            :required="isRequired"
                        />
                    </div>
                    <div>
                        <label for="clientPostCode">Post Code</label>
                        <input
                            type="text"
                            id="clientPostCode"
                            v-model="clientPostCode"
                            :required="isRequired"
                        />
                    </div>
                    <div>
                        <label for="clientCountry">Country</label>
                        <input
                            type="text"
                            id="clientCountry"
                            v-model="clientCountry"
                            :required="isRequired"
                        />
                    </div>
                </div>
                <div class="modal-inner__one-block-items">
                    <div class="modal-inner__invoice-date">
                        <label for="invoiceDate">Invoice Date </label>
                        <input
                            type="text"
                            id="invoiceDate"
                            v-model="invoiceDate"
                            disabled
                        />
                    </div>
                    <div class="modal-inner__payment-terms">
                        <label for="paymentTerms">Payment Terms</label>
                        <select id="paymentTerms" v-model="paymentTerms">
                            <option value="1">Net 1 Day</option>
                            <option value="7">Net 7 Days</option>
                            <option value="14">Net 14 Days</option>
                            <option value="30">Net 30 Days</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label for="projectDescription">Project Description</label>
                    <input
                        type="text"
                        id="projectDescription"
                        v-model="projectDescription"
                        :required="isRequired"
                    />
                </div>
            </fieldset>
            <fieldset class="modal-inner__item-list">
                <legend>Item List</legend>
                <div
                    class="modal-inner__one-block-items"
                    v-for="(item, index) in invoiceItemList"
                    :key="index"
                >
                    <div>
                        <label for="itemName">Item Name</label>
                        <input
                            type="text"
                            id="itemName"
                            v-model="item.itemName"
                            :required="isRequired"
                        />
                    </div>
                    <div>
                        <label for="itemQty">Qty.</label>
                        <input
                            type="number"
                            id="itemQty"
                            min="0"
                            v-model="item.qty"
                            :required="isRequired"
                        />
                    </div>
                    <div>
                        <label for="itemPrice">Price</label>
                        <input
                            type="number"
                            min="0"
                            id="itemPrice"
                            v-model="item.price"
                            :required="isRequired"
                        />
                    </div>
                    <div class="modal-inner__item-list-total">
                        <label for="itemTotal">Total</label>
                        <input
                            type="text"
                            id="itemTotal"
                            :placeholder="`${(item.total = item.qty * item.price)}`"
                            disabled
                        />
                    </div>
                    <button type="button" class="modal-inner__delete-item">
                        <img
                            src="../assets/icon-delete.svg"
                            alt="delete icon"
                            @click="deleteItem(item.id)"
                        />
                    </button>
                </div>
                <div class="form-wrapper__error" v-if="invoiceItemListError">
                    You must add at least one item
                </div>
                <button
                    class="btn btn--light-gray"
                    :class="{ 'btn--error': invoiceItemListError }"
                    type="button"
                    @click="addItem"
                >
                    + Add New Item
                </button>
            </fieldset>
            <div v-if="!editInvoice" class="modal-inner__buttons">
                <button
                    class="btn btn--light-gray"
                    type="button"
                    @click="$emit('close')"
                >
                    Discard
                </button>
                <button class="btn btn--dark-grayish-blue" @click="saveDraft">
                    Save as Draft
                </button>
                <button class="btn btn--purple" @click="savePending">
                    Save & Send
                </button>
            </div>
            <div v-else class="modal-inner__buttons modal-inner__buttons--edit">
                <button
                    class="btn btn--light-gray"
                    type="button"
                    @click="$emit('close')"
                >
                    Cancel
                </button>
                <button class="btn btn--purple" @click="saveChanges">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import useCollection from '../utils/useCollection'
import getUser from '../utils/getUser'
import { timestamp } from '../firebase/config'
import useDocument from '../utils/useDocument'

export default {
    name: 'InvoiceModal',
    props: ['edit', 'invoice'],
    setup(props, { emit }) {
        const billerStreetAddress = ref(null)
        const billerCity = ref(null)
        const billerPostCode = ref(null)
        const billerCountry = ref(null)
        const clientName = ref(null)
        const clientEmail = ref(null)
        const clientStreetAddress = ref(null)
        const clientCity = ref(null)
        const clientPostCode = ref(null)
        const clientCountry = ref(null)
        const invoiceDate = ref(
            new Date().toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        )
        const paymentTerms = ref('1')
        const paymentDue = ref(null)
        const projectDescription = ref(null)
        const invoiceItemList = ref([])
        const invoiceStatus = ref(null)
        const isRequired = ref(false)
        const { user } = getUser()
        const invoiceItemListError = ref(null)
        const invoiceTotal = ref(null)
        const editInvoice = ref(props.edit === undefined ? false : props.edit)
        const currentInvoice = ref(
            props.invoice === undefined
                ? null
                : JSON.parse(JSON.stringify(props.invoice)),
        )

        const createId = () => {
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            const letters = [...alphabet]
                .map(
                    () => alphabet[Math.floor(Math.random() * alphabet.length)],
                )
                .slice(0, 2)
                .join('')
            const digits = (Math.floor(Math.random() * 10000) + 10000)
                .toString()
                .substring(1)

            return letters + digits
        }

        const { error, addDoc } = useCollection('invoices', createId())

        if (editInvoice.value) {
            ;(billerStreetAddress.value =
                currentInvoice.value.billerStreetAddress),
                (billerCity.value = currentInvoice.value.billerCity),
                (billerPostCode.value = currentInvoice.value.billerPostCode),
                (billerCountry.value = currentInvoice.value.billerCountry),
                (clientName.value = currentInvoice.value.clientName),
                (clientEmail.value = currentInvoice.value.clientEmail),
                (clientStreetAddress.value =
                    currentInvoice.value.clientStreetAddress),
                (clientCity.value = currentInvoice.value.clientCity),
                (clientPostCode.value = currentInvoice.value.clientPostCode),
                (clientCountry.value = currentInvoice.value.clientCountry),
                (invoiceDate.value = currentInvoice.value.invoiceDate),
                (paymentTerms.value = currentInvoice.value.paymentTerms),
                (paymentDue.value = currentInvoice.value.paymentDue),
                (projectDescription.value =
                    currentInvoice.value.projectDescription),
                (invoiceItemList.value = currentInvoice.value.invoiceItemList),
                (invoiceTotal.value = currentInvoice.value.invoiceTotal)
        }

        watchEffect(() => {
            const date = new Date(invoiceDate.value)
            date.setDate(date.getDate() + parseInt(paymentTerms.value))

            paymentDue.value = date.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })
        })

        const addItem = () => {
            invoiceItemList.value.push({
                id: createId(),
                itemName: '',
                qty: 0,
                price: 0,
                total: 0,
            })
        }

        const deleteItem = (id) => {
            invoiceItemList.value = invoiceItemList.value.filter(
                (item) => item.id !== id,
            )
        }

        const sumInvoiceTotal = () => {
            invoiceTotal.value = invoiceItemList.value.reduce(
                (acc, item) => acc + item.total,
                0,
            )
        }

        const submitInvoice = async () => {
            if (invoiceStatus.value === 'pending') {
                invoiceItemListError.value = false
                if (!invoiceItemList.value.length) {
                    invoiceItemListError.value = true
                }
            }

            if (!invoiceItemListError.value) {
                sumInvoiceTotal()

                await addDoc({
                    billerStreetAddress: billerStreetAddress.value,
                    billerCity: billerCity.value,
                    billerPostCode: billerPostCode.value,
                    billerCountry: billerCountry.value,
                    clientName: clientName.value,
                    clientEmail: clientEmail.value,
                    clientStreetAddress: clientStreetAddress.value,
                    clientCity: clientCity.value,
                    clientPostCode: clientPostCode.value,
                    clientCountry: clientCountry.value,
                    invoiceDate: invoiceDate.value,
                    paymentTerms: paymentTerms.value,
                    paymentDue: paymentDue.value,
                    projectDescription: projectDescription.value,
                    invoiceItemList: invoiceItemList.value,
                    invoiceTotal: invoiceTotal.value,
                    invoiceStatus: invoiceStatus.value,
                    userId: user.value.uid,
                    timestamp: timestamp,
                })

                if (!error.value) {
                    emit('close')
                }
            }
        }

        const saveDraft = () => {
            isRequired.value = false
            invoiceStatus.value = 'draft'
        }

        const savePending = () => {
            isRequired.value = true
            invoiceStatus.value = 'pending'
        }

        const saveChanges = () => {
            isRequired.value = true
        }

        const updateInvoice = async () => {
            const { updateDoc, error: updateError } = useDocument(
                'invoices',
                props.invoice.id,
            )

            invoiceItemListError.value = false
            if (!invoiceItemList.value.length) {
                invoiceItemListError.value = true
            }

            if (!invoiceItemListError.value) {
                sumInvoiceTotal()

                const updates = {
                    billerStreetAddress: billerStreetAddress.value,
                    billerCity: billerCity.value,
                    billerPostCode: billerPostCode.value,
                    billerCountry: billerCountry.value,
                    clientName: clientName.value,
                    clientEmail: clientEmail.value,
                    clientStreetAddress: clientStreetAddress.value,
                    clientCity: clientCity.value,
                    clientPostCode: clientPostCode.value,
                    clientCountry: clientCountry.value,
                    paymentTerms: paymentTerms.value,
                    paymentDue: paymentDue.value,
                    projectDescription: projectDescription.value,
                    invoiceItemList: invoiceItemList.value,
                    invoiceTotal: invoiceTotal.value,
                    invoiceStatus:
                        currentInvoice.value.invoiceStatus === 'draft'
                            ? 'pending'
                            : currentInvoice.value.invoiceStatus,
                }
                await updateDoc(updates)

                if (!updateError.value) {
                    emit('close')
                }
            }
        }

        const handleSubmit = () => {
            if (editInvoice.value) {
                updateInvoice()
            } else {
                submitInvoice()
            }
        }

        return {
            billerStreetAddress,
            billerCity,
            billerPostCode,
            billerCountry,
            clientName,
            clientEmail,
            clientStreetAddress,
            clientCity,
            clientPostCode,
            clientCountry,
            invoiceDate,
            paymentTerms,
            projectDescription,
            invoiceItemList,
            addItem,
            deleteItem,
            saveDraft,
            savePending,
            saveChanges,
            isRequired,
            invoiceItemListError,
            editInvoice,
            currentInvoice,
            updateInvoice,
            handleSubmit,
        }
    },
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
    display: flex;
    width: 100%;
    height: 100vh;
    transition: opacity 0.2s ease;
    position: absolute;
    top: 90px;
    z-index: 1;

    @media (min-width: 900px) {
        position: fixed;
        top: 0;
        left: 0;
    }
}

.modal-inner {
    max-width: 660px;
    padding: 30px;
    background-color: var(--background-modal-colar);
    transition: all 0.2s ease-in;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    & input,
    & select {
        font-weight: 700;

        &:invalid {
            border: 1px solid var(--error-color);
        }
    }

    @media (min-width: 900px) {
        padding: 30px 30px 30px 130px;
    }

    @media (min-width: 677px) {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    &__bill-from,
    &__bill-to {
        border: 0;
        margin-top: 40px;

        & legend {
            font-size: 0.7rem;
            font-weight: 700;
            color: var(--button-color-primary);
            margin-bottom: 20px;
        }
    }

    &__one-block-items {
        display: flex;
        align-items: center;
        gap: 15px;

        @media (min-width: 677px) {
            & > * {
                flex: 1;
            }
        }
    }

    &__invoice-date,
    &__payment-terms {
        flex: 1;
    }

    &__invoice-date input {
        &:disabled {
            background-color: var(--background-color);
            color: var(--font-color-secondary);

            @media (min-width: 340px) {
                background-image: url('../assets/icon-calendar.svg');
                background-repeat: no-repeat;
                background-position: top 50% right 15px;
            }
        }
    }

    &__payment-terms {
        & select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            position: relative;
            background-image: url('../assets/icon-select-arrow.svg');
            background-repeat: no-repeat;
            background-position: top 50% right 15px;
        }
    }

    &__item-list {
        border: 0;
        margin-top: 40px;

        & legend {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--font-color-secondary);
            margin-bottom: 30px;
        }

        & button {
            width: 100%;
            margin: 20px 0;
        }

        &-total {
            & input {
                border: 0;
                background: transparent;
                padding-left: 0;
                padding-right: 0;
            }
        }

        & .modal-inner__one-block-items {
            flex-wrap: wrap;
            justify-content: space-between;

            & > div:nth-child(1) {
                width: 100%;
            }

            & > div:not(:first-child):not(:last-child) {
                flex: 1;
            }

            @media (min-width: 677px) {
                &:not(:nth-child(2)) label {
                    display: none;
                }
                & > div:nth-child(1) {
                    flex: 2;
                }

                & > div:nth-child(2) {
                    flex: 0.5;
                }
            }
        }
    }

    &__delete-item {
        border: 0;
        background-color: transparent;
        flex: 0;
        padding-top: 10px;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
    }

    &__buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        margin-bottom: 100px;
        gap: 10px;

        @media (min-width: 900px) {
            margin-bottom: 0;
        }

        & button:nth-child(1) {
            margin-right: auto;
        }

        &--edit {
            & button:nth-child(1) {
                margin-right: 0;
            }
        }
    }
}
</style>
