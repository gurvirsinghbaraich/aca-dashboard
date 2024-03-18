import z from "zod";
import { ServerActionResponse } from "@/interface";

export default async function searchAgent(
  formData: FormData,
): Promise<ServerActionResponse> {
  "use server";

  const requestSchema = z.object({
    search: z.string().min(1, "Search Field is required"),
  });

  try {
    const data = Object.fromEntries(formData.entries());
    const { search } = requestSchema.parse(data);

    return {
      errors: [],
      success: true,
      data: search,
    };
  } catch (error: any) {
    return {
      success: false,
      errors: error.errors,
    };
  }
}
