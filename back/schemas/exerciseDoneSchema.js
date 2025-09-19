import { z } from 'zod';

const routineSchema = z.object({
  exerciseId: z.uuid("Exercise ID must be a valid UUID"),
  series: z
    .number({ invalid_type_error: "Series must be a number" })
    .int("Series must be an integer")
    .positive("Series must be positive")
    .optional(),
  repeatsPerSeries: z
    .array(z.number().int().positive("Repeats must be positive"))
    .optional(),
  weightPerSeries: z
    .array(
      z
        .number({ invalid_type_error: "Weight must be a number" })
        .nonnegative("Weight must be >= 0")
    )
    .optional(),
  comments: z.string().optional(),
});

export function validate(object) {
  return routineSchema.safeParse(object);
}

export function partialValidate(object) {
  return routineSchema.partial().safeParse(object);
}
