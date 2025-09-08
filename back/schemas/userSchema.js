import { z } from 'zod';

const userSchema = z.object({
  username: z.string().nonempty('Username is required.'),
  password: z.string()
    .nonempty('Password is required.')
    .min(8, 'Password must have at least 8 characters.')
    .max(24, 'Password must have at most 24 characters.'),
  email: z.email('Email is invalid').nonempty('Email is required.')
});

export function validate (object) {
  return userSchema.safeParse(object);
}

export function partialValidate (object) {
  return userSchema.partial().safeParse(object);
}
