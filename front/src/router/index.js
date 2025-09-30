import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../views/HomeComponent.vue";
import InfoComponent from "../views/InfoComponent.vue";
import CreateExerciseComponent from "../components/CreateExerciseComponent.vue";
import BrowserExercise from "../views/Browsers/BrowserExercise.vue";
import LoginComponent from "../views/LoginComponent.vue";
import { useAuthStore } from "../stores/auth";
import { ToastCumtom } from "../../utils/toast";
import RoutineDashBoard from "../components/RoutineDashBoard.vue";
import ExerciseComponent from "../components/ExerciseComponent.vue";
import RoutineManager from "../components/RoutineManager.vue";
import CreateRoutineComponent from "../components/CreateRoutineComponent.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            name: "Login",
            component: LoginComponent
        }, {
            path: "/routine/dashboard",
            name: "RoutineDashboard",
            component: RoutineDashBoard
        },
        {
            path: "/",
            name: "Home",
            component: HomeComponent
        },
        {
            path: "/routines",
            name: "Routines",
            component: RoutineManager
        },
        {
            path: "/routine/new",
            name: "routine-create",
            component: CreateRoutineComponent
        },
        {
            path: "/routine/:id",
            name: "routine-detail",
            component: CreateRoutineComponent
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
            component: ExerciseComponent
        }]
});


router.beforeEach(async (to, from, next) => {

    const publicPages = ["Login"];
    const authStore = useAuthStore();

    let msgError = '';

    // Compruebo si hay sesion
    if (!authStore.isAuthenticated) {
        try {
            await authStore.checkSession();
        } catch (error) {
            msgError = error.message;
        }
    }

    // Si hay sesion no dejo que vaya a las publicas
    if (publicPages.includes(to.name)) {

        if (authStore.isAuthenticated) { router.push({ name: 'Home' }); }

        return next();
    }

    // Si no tiene sesion no le dejo que vaya a las privadas
    if (!authStore.isAuthenticated) {
        router.push({ name: 'Login' }).then(() => {
            ToastCumtom.warn(msgError)
        });
    }

    return next();
});

