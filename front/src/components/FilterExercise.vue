<script setup>
import { ref } from 'vue'

const isLoading = ref(false)
const categoryOptions = ref(['Strength', 'Cardio', 'Flexibility', 'Balance'])
const musclesOptions = ref(['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'])

const selectedCategory = ref('')
const selectedMuscle = ref('')

const handleSubmit = () => {
  console.log('Selected:', selectedCategory.value, selectedMuscle.value)
}
</script>

<template>
  <SpinComponent v-if="isLoading" />
  <div class="filter-container" v-else>
    <form @submit.prevent="handleSubmit" class="filter-form">

      <div class="filter-group">
        <label for="category">Category:</label>
        <select id="category" v-model="selectedCategory">
          <option value="">All</option>
          <option v-for="category in categoryOptions" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="muscle">Muscle:</label>
        <select id="muscle" v-model="selectedMuscle">
          <option value="">All</option>
          <option v-for="muscle in musclesOptions" :key="muscle" :value="muscle">
            {{ muscle }}
          </option>
        </select>
      </div>

      <button type="submit">Apply Filter</button>
    </form>
  </div>
</template>

<style scoped>
.filter-container {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #333;
}

.filter-group select {
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  min-width: 150px;
  transition: all 0.2s;
}

.filter-group select:focus {
  border-color: #10b981;
  box-shadow: 0 0 5px rgba(16, 185, 129, 0.4);
  outline: none;
}

button {
  padding: 0.5rem 1rem;
  background: linear-gradient(145deg, #10b981, #3b82f6);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
}
</style>
