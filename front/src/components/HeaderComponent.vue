<script setup>
import { useAuthStore } from '../stores/auth';
import { router } from '../router/index.js'
import { toast } from 'vue3-toastify';

const authStore = useAuthStore();
const user = authStore.auth;


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

      <div class="nav-left">
        <div class="user-greeting">
          <span class="greeting">Hello</span>
          <span class="username">{{ user.username }}</span>
        </div>
      </div>

      <div class="center-links">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/exercises">Exercises</router-link>
      </div>

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
  z-index: 1;
}

.nav-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  /* left - center - right */
  align-items: center;

  margin: 0 auto;
  padding: 0 20px;
}

.center-links {
  display: flex;
  gap: 20px;
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
</style>
