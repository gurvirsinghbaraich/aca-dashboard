import getDatabase from "@/auth/providers/prisma";
import compare from "@/lib/compare";

export default function validateUser(
  username: string,
  password: string,
): Promise<
  | boolean
  | Partial<{
      id: string;
      fullName: string;
      role: string;
      emailVerified: boolean;
    }>
> {
  return new Promise(async (resolve) => {
    const employee = await getDatabase().employee.findFirst({
      where: { username },
    });

    // No employee found, means invalid login credentials!
    if (!employee) {
      return resolve(false);
    }

    // Invalid login credentials, if the password does not match the stored password
    const isValidPassword = compare(password, employee.password);
    if (!isValidPassword) {
      return resolve(false);
    }

    resolve({
      id: employee.id,
      role: employee.role,
      fullName: employee.fullName,
      emailVerified: employee.emailVerified ?? false,
    });
  });
}
