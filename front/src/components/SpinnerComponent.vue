<script setup></script>

<template>
    <div class="spinner-container">
        <div class="spinner"></div>
    </div>
</template>

<style scoped>

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    z-index: 1;
}

.spinner {
    width: 100px;
    height: 100px;
    border: 20px solid #07b693;
    border-top-color: #1bcca9;
    border-radius: 50%;
    animation: spin 0.8s alternate infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>