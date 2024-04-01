<template>
    <div class="filter">
        <span class="filter__title" @click="toggleFilterList">
            <span class="filter__title-text">Filter by Status</span>
            <span class="filter__title-text--short">Filter</span>
            <img
                class="filter__img"
                :class="{ 'filter__img--rotate': filterList }"
                src="../assets/icon-arrow-down.svg"
                alt="filter icon"
        /></span>
        <transition name="down">
            <div
                class="dropdown"
                v-show="filterList"
                @change="filterByStatus(checkedStatuses)"
            >
                <label class="dropdown__item"
                    >Paid
                    <input
                        type="checkbox"
                        name="paid"
                        id="paid"
                        value="paid"
                        v-model="checkedStatuses"
                    />
                    <span class="dropdown__checkmark"></span>
                </label>
                <label class="dropdown__item"
                    >Pending
                    <input
                        type="checkbox"
                        name="pending"
                        id="pending"
                        value="pending"
                        v-model="checkedStatuses"
                    />
                    <span class="dropdown__checkmark"></span>
                </label>
                <label class="dropdown__item"
                    >Draft
                    <input
                        type="checkbox"
                        name="draft"
                        id="draft"
                        value="draft"
                        v-model="checkedStatuses"
                    />
                    <span class="dropdown__checkmark"></span>
                </label>
            </div>
        </transition>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'Filter',
    setup(props, { emit }) {
        const filterList = ref(false)
        const checkedStatuses = ref([])

        const toggleFilterList = () => {
            filterList.value = !filterList.value
        }

        const filterByStatus = () => {
            emit('get-statuses', checkedStatuses.value)
        }

        return {
            filterList,
            toggleFilterList,
            checkedStatuses,
            filterByStatus,
        }
    },
}
</script>

<style lang="scss" scoped>
.filter {
    position: relative;

    &__title {
        font-size: 0.75rem;
        font-weight: 700;
        cursor: pointer;

        &-text {
            display: none;

            @media (min-width: 900px) {
                display: inline;
            }

            &--short {
                @media (min-width: 900px) {
                    display: none;
                }
            }
        }
    }

    &__img {
        margin-left: 5px;
        transition: transform 0.3s ease 0s;

        &--rotate {
            transform: rotate(180deg);
        }
    }
}

.dropdown {
    background-color: var(--background-box-color);
    padding: 25px 25px 10px 25px;
    margin-top: 20px;
    border-radius: 10px;
    box-shadow: rgba(73, 73, 94, 0.2) 0px 7px 29px 0px;
    position: absolute;
    min-width: 160px;
    z-index: 2;

    &__item {
        display: block;
        position: relative;
        padding-left: 25px;
        margin-bottom: 15px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 700;
        color: inherit;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;

            &:checked ~ .dropdown__checkmark {
                background-color: var(--button-color-primary);
                border: 1px solid var(--button-color-primary);
            }

            &:checked ~ .dropdown__checkmark:after {
                display: block;
            }
        }

        &:hover input ~ .dropdown__checkmark {
            border-color: var(--button-color-primary);
        }
    }

    &__checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        width: 16px;
        border-radius: 2px;
        background-color: var(--border-color-primary);
        border: 1px solid var(--border-color-primary);

        &::after {
            content: '';
            position: absolute;
            display: none;
            left: 5px;
            top: 2px;
            width: 2px;
            height: 6px;
            border: solid #fff;
            border-width: 0 2px 2px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }
}

.down-enter-active {
    animation: filter-down 0.3s ease-in-out;
}

@keyframes filter-down {
    0% {
        opacity: 0;
        transform: translateY(-80px);
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translate(0);
    }
}
</style>
