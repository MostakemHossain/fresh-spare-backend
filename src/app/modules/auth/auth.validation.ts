import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
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
const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    newPassword: z.string({
      required_error: 'New Password is required',
    }),
    confirmPassword: z.string({
      required_error: 'Confirm Password is required',
    }),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
  }),
});
const verifyForgotPasswordOTPValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    otp: z.string({
      required_error: 'OTP is required',
    }),
  }),
});

const authValidations = {
  loginValidationSchema,
  forgotPasswordValidationSchema,
  verifyForgotPasswordOTPValidationSchema,
  resetPasswordValidationSchema,
};

export default authValidations;
