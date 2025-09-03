import express, { json } from "express";
import { exercisesRouter } from "./routers/exercise-router.js";
import logger from "morgan";
import cors from "cors";
import config from "./config.js";

const app = express(); 
const port = config.app.port
app.disable("x-powered-by")
app.use(json());

console.clear();
app.use(logger('dev'))

app.use(cors({
    origin: function (origin, callback) {

        // Allow requests without origin (postman)
        if (!origin) return callback(null, true);

        if (config.cors.validOrigins.includes(origin)) {
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