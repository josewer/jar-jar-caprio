import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../views/HomeComponent.vue";
import InfoComponent from "../views/InfoComponent.vue";
import CreateExerciseComponent from "../components/CreateExerciseComponent.vue";
import BrowserExercise from "../views/Browsers/BrowserExercise.vue";
import LoginComponent from "../views/LoginComponent.vue";
import { useAuthStore } from "../stores/auth";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            name: "Login",
            component: LoginComponent
        }, {
            path: "/",
            name: "Home",
            component: HomeComponent
        },
        {
            path: "/info",
            name: "Info",
            component: InfoComponent
        }, {
            path: "/exercise/:id",
            name: "exercise-detail",
            component: CreateExerciseComponent
        },
        {
            path: "/exercise/new",
            name: "createExercise",
            component: CreateExerciseComponent
        },
        {
            path: "/exercises",
            name: "exercises",
            component: BrowserExercise
        }]
});


router.beforeEach(async (to, from, next) => {

    const publicPages = ["/login"];
    const authStore = useAuthStore();

    if (publicPages.includes(to.path)) { return next(); }

    try {
        // Compruebo si la sesion no esta actualizada
        if (!authStore.isAuthenticated) { await authStore.checkSession(); }
    } catch (err) {
        // Despues de comprobarla, si todavia me dice que no esta registrado se envia al login.
        router.push({name : 'Login'}).then(() => {
            toast.warn(err.message);
        });
    }
    return next();

});

