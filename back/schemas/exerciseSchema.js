const z = require("zod")
const { Muscles } = require("../enums/Muscles")
const { Categories } = require("../enums/Categories")

const exerciseSchema = z.object({
    name: z.string().nonempty("Name is required."),
    category: z.enum(Object.values(Categories), "Category is required."),
    muscle: z.enum(Object.values(Muscles), "Muscle is required.")
})

function validate (object) {
    return exerciseSchema.safeParse(object);
}

function partialValidate (object) {
    return exerciseSchema.partial().safeParse(object);
}

module.exports = {
    validate , partialValidate
}