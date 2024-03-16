import z from "zod";
import hash from "@/lib/hash";
import getDatabase from "@/auth/providers/prisma";
import { ServerActionResponse } from "@/interface";

export default async function createAgent(
  formData: FormData,
): Promise<ServerActionResponse> {
  "use server";

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

    console.log(password);

    // Create a new agent
    await getDatabase().employee.create({
      data: {
        email,
        address,
        fullName,
        username,
        role: "agent",
        phoneNumber: phone,
        password: passwordHash,
      },
    });

    return { success: true, errors: [] };
  } catch (error: any) {
    return {
      success: false,
      errors: error.errors,
    };
  }
}
