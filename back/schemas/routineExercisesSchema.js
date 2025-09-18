import { z } from 'zod';

const routineExerciseSchema = z.object({
  routineId: z.uuid('Routine ID must be a valid UUID')
    .nonempty('Routine ID is required'),
  exerciseId: z.uuid('Exercise ID must be a valid UUID')
    .nonempty('Exercise ID is required'),
  numSeries: z
    .number({ required_error: "Number of series is required" })
    .positive("Number of series must be positive")
    .optional(),
  numRepeats: z
    .number({ required_error: "Number of repeats is required" })
    .positive("Number of repeats must be positive")
    .optional()
});

export function validate(object) {
  return routineExerciseSchema.safeParse(object);
}

export function partialValidate(object) {
  return routineExerciseSchema.partial().safeParse(object);
}
