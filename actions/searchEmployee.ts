import z from "zod";
import getDatabase from "@/auth/providers/prisma";
import { ServerActionResponse } from "@/interface";
import { Employee } from "@prisma/client";

export default async function searchEmployee(
  formData: FormData,
): Promise<
  ServerActionResponse<
    Pick<Employee, "id" | "username" | "email" | "phoneNumber">[]
  >
> {
  "use server";

  const requestSchema = z.object({
    search: z.string().min(1, "Search Field is required"),
    role: z.string(),
  });

  try {
    const data = Object.fromEntries(formData.entries());
    const { search, role } = requestSchema.parse(data);

    if (role != "agent" && role != "customer") {
      return {
        success: false,
        errors: [
          {
            message: "Invalid Role",
            path: ["search"],
          },
        ],
      };
    }

    const employees = await getDatabase().employee.findMany({
      where: {
        role: role,
        OR: [
          { fullName: { contains: search } },
          { email: { contains: search } },
          { username: { contains: search } },
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
        phoneNumber: true,
      },
    });

    console.log(employees);

    return {
      errors: [],
      success: true,
      data: employees,
    };
  } catch (error: any) {
    return {
      success: false,
      errors: error.errors,
    };
  }
}
