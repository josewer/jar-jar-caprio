import { z } from "zod"
import { Muscles } from "../enums/Muscles.js"
import { Categories } from "../enums/Categories.js"

const exerciseSchema = z.object({
    name: z.string().nonempty("Name is required."),
    category: z.enum(Object.values(Categories), "Category is required."),
    muscle: z.enum(Object.values(Muscles), "Muscle is required.")
})

export function validate (object) {
    return exerciseSchema.safeParse(object);
}

export function partialValidate (object) {
    return exerciseSchema.partial().safeParse(object);
}
