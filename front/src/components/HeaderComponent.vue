<script setup>
import { useAuthStore } from '../stores/auth';
import { router } from '../router/index.js'
import { toast } from 'vue3-toastify';
import { ref } from 'vue'

const authStore = useAuthStore();
const user = authStore.auth;

const isOpen = ref(false)

const handlerLogout = async () => {
  await authStore.logout();

  router.push({ name: 'Login' }).then(() => {
    toast.info('Logged out');
  });
}
</script>

<template>
  <header>
    <nav class="nav-grid">

      <!-- IZQUIERDA -->
      <div class="nav-left">
        <div class="user-greeting">
          <span class="greeting">Hello</span>
          <span class="username">{{ user.username }}</span>
        </div>
      </div>

      <!-- BOTÓN HAMBURGUESA (solo móvil) -->
      <button class="menu-toggle" @click="isOpen = !isOpen">
        ☰
      </button>

      <!-- CENTRO (links) -->
      <div class="center-links" :class="{ open: isOpen }">
        <router-link class="link" to="/"><p title="Inicio">Inicio</p></router-link>
        <router-link class="link" to="/routines">Rutinas</router-link>
        <router-link class="link" to="/exercises">Ejercicios</router-link>
      </div>

      <!-- DERECHA -->
      <div class="login">
        <button class="btn-logout" @click="handlerLogout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--header-main-background);
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 3;
}

.nav-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
}

.center-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.link {
  text-decoration: none;
  color: white;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.2s ease;
}

.link:hover {
  background-color: var(--button-hover-primary-background);
  transform: scale(1.05);
}

.router-link-active {
  background-color: var(--button-primary-background);
  color: white;
}

.btn-logout {
  background-color: crimson;
  color: #fff;
  font-weight: 600;
  padding: 11px 22px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.btn-logout:hover {
  background-color: darkred;
  transform: scale(1.05);
}

.user-greeting {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  color: white;
}

.user-greeting .username {
  font-weight: 700;
  color: var(--button-primary-background);
}

/* HAMBURGUESA */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-grid {
    grid-template-columns: auto auto auto; /* botón en el centro */
  }

  .menu-toggle {
    display: block;
  }

  .center-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--header-main-background);
    padding: 1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    z-index: 1;
  }

  .center-links.open {
    display: flex;
  }
}
</style>
