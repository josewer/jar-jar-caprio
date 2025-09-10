<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useAuthStore } from './stores/auth'
import { config } from "../config";

const authStore = useAuthStore();

function runHeartBeat() {
  setInterval(async () => {
    try {

      if (authStore.isAuthenticated) {
        await authStore.checkSession();
      }

    } catch (err) {

      toast.info(err.message, {
        position: "top-center",
        autoClose: false,
        closeButton: false
      })
    }
  } , config.heartbeat_time_in_seconds * 1000)
}

runHeartBeat();

</script>

<template>
  <RouterView />
</template>

<style scoped></style>