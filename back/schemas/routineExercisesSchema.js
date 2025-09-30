import { z } from 'zod';

const routineExerciseParamsSchema = z.object({
  routineId: z.uuid('Routine ID must be a valid UUID')
    .nonempty('Routine ID is required')
});

export const routineExerciseSchema = z.object({

  exerciseId: z.uuid('Exercise ID must be a valid UUID')
    .nonempty('Exercise ID is required'),
  numSeries: z
    .number({ required_error: "Number of series is required" })
    .positive("Number of series must be positive")
    .optional(),
  numRepeats: z
    .number({ required_error: "Number of repeats is required" })
    .positive("Number of repeats must be positive")
    .optional(),
  timePerSet: z
    .string().regex(/^\d{2}:\d{2}$/, "Time per set must be in mm:ss format")
    .optional(),
  restTime: z
    .string().regex(/^\d{2}:\d{2}$/, "Rest time must be in mm:ss format")
    .optional(),
  type: z
    .string({ required_error: "Type is required" })
    .max(1, "Type must be a single character")
    .optional()
});

export function validate(object) {
  return routineExerciseSchema.safeParse(object);
}

export function validateParams(object) {
  return routineExerciseParamsSchema.safeParse(object);
}

export function partialValidate(object) {
  return routineExerciseSchema.partial().safeParse(object);
}
