import { Router } from "express";
import { validate } from "../schemas/exerciseSchema.js";

export const exercisesRouter = Router();

const exercises = [{
    id: 1,
    name: "Jose",
    muscle: "Legs",
    category: "Cardio"
}]


exercisesRouter.get("/", (req, res) => {
    console.log(req.query)
    return res.status(200).json(exercises);
});

exercisesRouter.get("/:id", (req, res) => {
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


exercisesRouter.delete("/:id", (req, res) => {
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


exercisesRouter.post("/", (req, res) => {
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


exercisesRouter.put("/:id", (req, res) => {

    const id = req.params.id;
    const index = exercises.findIndex(f => f.id == id);

    if (index == -1) {
        return res.status(404).json({
            error: "Not found.",
            details: `Exercise with id ${id} does not exist.`
        });
    }

    const result = validate(req.body);

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