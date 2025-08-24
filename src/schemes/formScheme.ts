import { z } from 'zod';

const passwordCheck =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

const fileSizeLimit = 0.1 * 1024 * 1024; //  перевод в байты

export const formScheme = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Please enter login' })
      .max(10)
      .refine((val) => /^[A-Z]/.test(val), {
        message: 'First letter must be uppercase',
      }),
    email: z.email('Please enter a valid email address'),
    age: z.number().min(4, { message: 'Please enter a valid age number' }),
    password: z
      .string()
      .min(4, { message: 'Please enter password' })
      .max(100)
      .refine((val) => passwordCheck.test(val), {
        message:
          'Password must include uppercase, lowercase, number, and special character',
      }),
    confirmPassword: z.string(),
    gender: z.string().min(1, { message: 'Please choose gender' }).max(10),
    country: z.string().min(1, { message: 'Please enter a country' }).max(100),
    acceptTnC: z.literal(true, {
      message: 'You must accept the Terms and Conditions',
    }),
    file: z
      .any()
      .transform((value) => {
        if (value instanceof FileList) return value[0];
        return value;
      })
      .refine((file) => file instanceof File, {
        message: 'Please upload a file',
      })
      .refine(
        (file) => {
          if (!file) return false;
          return ['image/png', 'image/jpeg'].includes(file.type);
        },
        {
          message: 'Invalid image file type',
        }
      )
      .refine(
        (file) => {
          if (!file) return false;
          return file.size <= fileSizeLimit;
        },
        {
          message: 'File size should not exceed 0.1mb',
        }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type DataForm = z.infer<typeof formScheme> & { image?: string }; //  расширили тип для base64
