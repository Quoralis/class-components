import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter login' }).max(10),
    email: z.email('Please enter a valid email address'),
    age: z.number().min(4, { message: 'Please enter a valid age number' }),
    password: z.string().min(4, { message: 'Please enter password' }).max(100),
    confirmPassword: z.string(),
    gender: z.string().min(1, { message: 'Please choose gender' }).max(10),
    country: z.string().min(1, { message: 'Please enter a country' }).max(100),
    acceptTnC: z.literal(true, {
      message: 'You must accept the Terms and Conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type DataForm = z.infer<typeof formSchema>;
