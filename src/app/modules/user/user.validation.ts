import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const verifyEmail = z.object({
  body: z.object({
    code: z.string({
      required_error: 'Id is Required',
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    password: z.string({}).optional(),
    mobile: z.string({}).optional(),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
  }),
});

const userValidations = {
  createUserValidationSchema,
  verifyEmail,
  updateUserValidationSchema,
  forgotPasswordValidationSchema,
};
export default userValidations;
