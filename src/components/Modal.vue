<template>
    <div class="modal-mask">
        <div class="modal-container">
            <div class="modal-header">
                <slot name="header"></slot>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    max-width: 480px;
    padding: 40px;
    background-color: var(--background-box-color);
    border-radius: 10px;
}

.modal-body {
    margin: 20px 0;
    color: var(--font-color-secondary);
    font-size: 0.8rem;
    line-height: 1.5;
}

.modal-footer {
    text-align: right;
}
</style>
