import express, { json } from "express";
import { exercisesRouter } from "./routers/exercises-router.js";

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by")
app.use(json());

import cors from "cors";

const CORS_VALIDOS = [
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {

        // Allow requests without origin (postman)
        if (!origin) return callback(null, true);

        if (CORS_VALIDOS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allow for this domain: " + origin));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/exercises", exercisesRouter);

app.use((req, res) => {
    return res.status(404).end("<h1>Page not found<h1>");
})

app.listen(port, () => { console.log(`Application running at http://localhost:${port}`) })