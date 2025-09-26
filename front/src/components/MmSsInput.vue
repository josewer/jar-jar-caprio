<script setup>
import { ref, watch, defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '00:00' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'mm:ss' }
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue);

watch(() => props.modelValue, val => internalValue.value = val);

// Inicializamos en 00:00 si está vacío
onMounted(() => {
  if (!internalValue.value) {
    internalValue.value = '00:00';
    emit('update:modelValue', internalValue.value);
  }
});

// Mientras escriben
const onInput = (e) => {
  let val = e.target.value.replace(/\D/g, ''); // quitar todo lo que no sea número
  if (val.length > 4) val = val.slice(0, 4);

  // Limitar los dígitos de minutos y segundos
  let mm = val.slice(0, 2);
  let ss = val.slice(2, 4);

  if (mm.length === 2 && Number(mm) > 59) mm = '59';
  if (ss.length === 2 && Number(ss) > 59) ss = '59';

  let formatted = mm;
  if (ss) formatted += ':' + ss;
  internalValue.value = formatted;
  emit('update:modelValue', formatted);
};

// Al perder foco
const onBlur = () => {
  let [mm, ss] = internalValue.value.split(':').map(Number);
  if (isNaN(mm)) mm = 0;
  if (isNaN(ss)) ss = 0;
  mm = Math.min(59, Math.max(0, mm));
  ss = Math.min(59, Math.max(0, ss));
  internalValue.value = `${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
  emit('update:modelValue', internalValue.value);
};
</script>

<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      v-model="internalValue"
      :placeholder="placeholder"
      maxlength="5"
      @input="onInput"
      @blur="onBlur"
    />
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--label-form-color, #333);
  font-size: 0.95rem;
}

input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  border-color: #1abc9c;
  box-shadow: 0 0 5px rgba(26,188,156,0.5);
  outline: none;
}
</style>
