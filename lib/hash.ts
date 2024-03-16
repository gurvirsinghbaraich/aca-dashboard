import md5 from "md5";

export default function hash(password: string): string {
  return md5(password);
}
