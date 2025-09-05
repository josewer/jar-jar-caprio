<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
    caption: String,
    description: String,
    showModal: Boolean
})

const emit = defineEmits([
    'handleRemove'
])

const isClosing = ref(false);

function confirmDelete(remove: boolean) {

    isClosing.value = true;

    // Espera que termine la animación antes de ocultar el modal
    // misma duración que fadeOut
    setTimeout(() => {
        isClosing.value = false;
        emit("handleRemove", remove);
    }, 200);
}


// --- lógica de arrastrar ---
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

function startDrag(e: MouseEvent) {
    const modal = document.querySelector(".modal") as HTMLElement;
    if (!modal) return;

    isDragging = true;
    offsetX = e.clientX - modal.offsetLeft;
    offsetY = e.clientY - modal.offsetTop;

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
}

function onDrag(e: MouseEvent) {
    if (!isDragging) return;
    const modal = document.querySelector(".modal") as HTMLElement;
    if (!modal) return;

    // Calculamos la nueva posición
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;

    // Limitar por los bordes de la ventana
    const maxLeft = window.innerWidth - modal.offsetWidth;
    const maxTop = window.innerHeight - modal.offsetHeight;

    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left > maxLeft) left = maxLeft;
    if (top > maxTop) top = maxTop;

    modal.style.left = `${left}px`;
    modal.style.top = `${top}px`;
    modal.style.margin = "0"; // quitar centrado automático al arrastrar
}


function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
}

</script>

<template>
    <div v-if="showModal" class="overlay">
        <section class="modal" :class="{ closing: isClosing }">
            <header @mousedown="startDrag">
                <h3>{{caption}}</h3>
            </header>

            <p>{{description}}</p>

            <div class="button-panel">
                <button class="btn btn-danger" @click="confirmDelete(true)">Delete</button>
                <button class="btn btn-cancel" @click="confirmDelete(false)">Cancel</button>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* Overlay oscuro */
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

/* Modal */
.modal {
    position: relative;
    background: #fff;
    color: #000;
    width: 400px;
    max-width: 90%;
    border-radius: 0.75rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    animation: fadeIn 0.1s ease-in-out;
    margin: auto;
}

.modal.closing {
    animation: fadeOut 0.2s ease-in-out forwards;
}

/* Cabecera arrastrable */
.modal header {
    background: var(--header-main-background);
    color: #fff;
    padding: 0.8rem;
    text-align: center;
    font-weight: bold;
    cursor: move;
    user-select: none;
}

.modal p {
    padding: 1rem;
    font-size: 1rem;
}

.button-panel {
    display: flex;
    justify-content: flex-end;
    gap: .5rem;
    padding: .8rem;
}

.btn {
    padding: 0.4rem 0.8rem;
    border-radius: 0.3rem;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;
}

.btn-danger {
    background: #e74c3c;
    color: #fff;
}

.btn-danger:hover {
    background: #c0392b;
}



/* Animación */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }

    to {
        opacity: 0;
        transform: scale(0.95);
    }
}

/* Responsive */
@media (max-width: 600px) {
    .modal {
        width: 95%;
    }
}
</style>
