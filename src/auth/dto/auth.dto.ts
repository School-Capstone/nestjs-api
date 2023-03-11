import * as z from 'zod';

const passwordSchema = z
  .string()
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
  });

export const userSchema = z
  .object({
    surname: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: passwordSchema,
    confirm_password: z.string(),
    avatar: z.string().optional(),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords do not match',
        path: ['confirm_password'],
      });
    }
  });

export type RegisterDto = z.infer<typeof userSchema>;
