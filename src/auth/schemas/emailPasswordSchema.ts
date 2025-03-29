import { z } from "zod";

export const emailPasswordSignupSchema = z
  .object({
    username: z
      .string({
        required_error: "First Name is required",
      })
      .nonempty({
        message: "First Name cannot be empty",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .nonempty({
        message: "Password cannot be empty",
      }),
    confirmPassword: z.string({
      required_error: "Password Confirmation is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const emailPasswordSigninSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
    }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type EmailPasswordSignUpRequest = z.infer<
  typeof emailPasswordSignupSchema
>;
export type EmailPasswordSigninRequest = z.infer<
  typeof emailPasswordSigninSchema
>;
