import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../views/HomeComponent.vue";
import InfoComponent from "../views/InfoComponent.vue";
import CreateExerciseComponent from "../components/CreateExerciseComponent.vue";
import BrowserExercise from "../views/Browsers/BrowserExercise.vue";


export const router = createRouter({
    history: createWebHistory(),
    routes: [{
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

