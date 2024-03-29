import { cookieExpiresIn, encryptSession, validateUser } from "@/auth";
import { makeFormError } from "@/auth/errors";
import { ServerActionResponse } from "@/interface";
import { cookies } from "next/headers";
import z from "zod";

export default async function login(
  formData: FormData,
): Promise<ServerActionResponse> {
  "use server";

  // Getting the user session
  const userSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  });

  try {
    const data = Object.fromEntries(formData.entries());
    const { username, password } = userSchema.parse(data);

    // Verifying if the user exists
    const user: any = await validateUser(username, password);

    if (!user) {
      const errors = [
        makeFormError("Invalid username or password", "username"),
      ];

      return {
        success: false,
        errors,
      };
    }

    if (!user.emailVerified) {
      const errors = [
        makeFormError(
          "Please verify your email, before logging in.",
          "username",
        ),
      ];

      return {
        success: false,
        errors,
      };
    }
    // Creating a user session
    const expires = new Date(Date.now() + cookieExpiresIn);

    const session = await encryptSession({
      user,
      expires,
    });

    // Saving the session in a cookie
    cookies().set("session", session, {
      expires,
      httpOnly: true,
    });

    return { success: true, errors: [] };
  } catch (error: any) {
    return {
      success: false,
      errors: error.errors,
    };
  }
}
