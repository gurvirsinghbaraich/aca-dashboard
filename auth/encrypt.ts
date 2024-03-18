import { SignJWT } from "jose";

export default async function encrypt(
  payload: any,
  key: Uint8Array,
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(`${24 * 60 * 60} sec from now`)
    .sign(key);
}
