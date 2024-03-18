import { sendVerificationEmail } from "@/actions/emails/resend";
import { encryptSession } from "@/auth";
import getDatabase from "@/auth/providers/prisma";
import { ServerActionResponse } from "@/interface";
import hash from "@/lib/hash";
import { headers } from "next/headers";
import z from "zod";

export default async function createAgent(
  formData: FormData,
): Promise<ServerActionResponse> {
  "use server";

  const headerMap = headers();
  const referer = headerMap.get("referer")!;

  if (!URL.canParse(referer)) {
    throw new Error("Invalid referer");
  }

  const { origin } = new URL(referer);

  const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    fullName: z.string().min(1, "Full Name is required"),
    address: z.string().min(1, "Address is required"),
    phone: z
      .string()
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number"),
    password: z.string().min(1, "Password is required"),
  });

  try {
    const data = Object.fromEntries(formData.entries());
    const { address, email, fullName, password, phone } =
      userSchema.parse(data);

    // Creating username for the user
    const username = email.split("@")[0].toLowerCase();
    const passwordHash = hash(password);

    const paylaod = {
      username,
      secret: Math.random().toString(36).substring(2),
      expires: new Date(0),
    };

    await Promise.all([
      getDatabase().employee.create({
        data: {
          email,
          address,
          fullName,
          username,
          role: "agent",
          phoneNumber: phone,
          password: passwordHash,
          secret: paylaod.secret,
        },
      }),
      sendVerificationEmail({
        email,
        url: new URL(
          `auth/verify-email?_q=${await encryptSession(paylaod)}`,
          origin,
        ).toString(),
      }),
    ]);

    return { success: true, errors: [] };
  } catch (error: any) {
    return {
      success: false,
      errors: error.errors,
    };
  }
}
