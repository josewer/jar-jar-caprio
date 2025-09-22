import { z } from 'zod';


const dateSchema = z.coerce.date({
  required_error: "Date is required",
  invalid_type_error: "Date must be a valid date or timestamp",
});

const routineExerciseSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema.optional(),
  totalDuration: z
    .number()
    .int("Total duration must be an integer")
    .positive("Total duration must be positive")
    .optional(),
  perceivedEffort: z
    .number()
    .int("Perceived effort must be an integer")
    .min(1, "Perceived effort must be at least 1")
    .max(5, "Perceived effort must be at most 5")
    .optional(),
});


export function validate(object) {
  return routineExerciseSchema.safeParse(object);
}

export function partialValidate(object) {
  return routineExerciseSchema.partial().safeParse(object);
}
