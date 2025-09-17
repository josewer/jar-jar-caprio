import { z } from 'zod';

// Esquema para template_routine
const routineSchema = z.object({
  user_id: z.uuid('User ID must be a valid UUID')
    .nonempty('User ID is required'),
  name: z.string()
    .nonempty('Routine name is required')
    .max(100, 'Routine name must be at most 100 characters'),
  description: z.string()
    .max(500, 'Description must be at most 500 characters')
    .optional()
});

export function validate(object) {
  return routineSchema.safeParse(object);
}

export function partialValidate(object) {
  return routineSchema.partial().safeParse(object);
}
