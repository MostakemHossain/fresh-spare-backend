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

const userValidations = {
  createUserValidationSchema,
  verifyEmail,
};
export default userValidations;
