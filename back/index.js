import express, { json } from "express";
import { validate } from "./schemas/exerciseSchema.js";

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

        // Allow reques without origin (postman)
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

const exercises = [{
    id: 1,
    name: "Jose",
    muscle: "Legs",
    category: "Cardio"
}]


app.get("/", (req, res) => {
    console.log(req.query)
    return res.status(200).json(exercises);
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    const exercise = exercises.find(f => f.id == id);

    if (exercise) {
        return res.status(200).json(exercise);
    } else {
        return res.status(404).json({
            error: "Not found",
            details: `Exercise with id ${id} does not exist`
        });
    }
});


app.delete("/:id", (req, res) => {
    const id = req.params.id;
    const index = exercises.findIndex(f => f.id == id);
    console.log(index)

    if (index != -1) {
        exercises.splice(index, 1);
        return res.status(204).send();
    } else {
        return res.status(404).json({
            error: "Not found.",
            details: `Exercise with id ${id} does not exist.`
        });
    }
});


app.post("/", (req, res) => {
    const result = validate(req.body);

    if (result.success) {
        const exercise = {
            id: crypto.randomUUID(),
            ...result.data
        }

        exercises.push(exercise);
        return res.status(201).json(exercise);
    } else {
        return res.status(400).json(JSON.parse(result.error.message));
    }
});


app.put("/:id", (req, res) => {

    const id = req.params.id;
    const index = exercises.findIndex(f => f.id == id);

    if (index == -1) {
        return res.status(404).json({
            error: "Not found.",
            details: `Exercise with id ${id} does not exist.`
        });
    }

    const result = validate(req.body);

    console.log(req.body)

    if (result.success) {
        const exercise = {
            id,
            ...result.data
        }

        exercises[index] = exercise;
        return res.status(200).json(exercise);
    } else {
        return res.status(400).json(JSON.parse(result.error.message));
    }
});

app.use((req, res) => {
    return res.end("<h1>Page not found<h1>").status(404);
})

app.listen(port, () => { console.log(`Application running at http://localhost:${port}`) })