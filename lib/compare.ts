import hash from "@/lib/hash";

export default function compare(
  inputPassword: string,
  hashedPassword: string,
): boolean {
  return hash(inputPassword) == hashedPassword;
}
