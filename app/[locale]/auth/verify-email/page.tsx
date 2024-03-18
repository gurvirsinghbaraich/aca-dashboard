import { decryptSession, getSession } from "@/auth";
import getDatabase from "@/auth/providers/prisma";
import { SessionCookie } from "@/interface";
import Head from "next/head";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage() {
  const session = await getSession<SessionCookie>();

  if (session) {
    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: `<script>setTimeout(() => {
              window.location.href = "/";
            }, 1000)</script>`,
          }}
        ></div>
        <div className="grid h-screen w-screen place-items-center overflow-hidden">
          <p>
            You are already logged in as {session.user.fullName}, Please logout
            first!!!
          </p>
        </div>
      </>
    );
  }

  const headerMap = headers();
  const referer = headerMap.get("Request-Url")!;

  console.log({ referer });

  if (!URL.canParse(referer)) {
    throw new Error("Invalid Request!");
  }

  const params = new URL(referer).searchParams;
  const emailJWT = params.get("_q");

  if (!emailJWT) {
    return redirect("/");
  }

  try {
    const { username, secret } = await decryptSession<{
      username: string;
      secret: string;
    }>(emailJWT);

    const employee = await getDatabase().employee.findFirst({
      where: { username },
    });

    if (!employee) {
      return redirect("/");
    }

    if (employee.secret !== secret) {
      return (
        <>
          <div className="grid h-screen w-screen place-items-center overflow-hidden">
            <p className="text-red-700">
              Your email cannot be verified, Please try again later!!!
            </p>
          </div>
        </>
      );
    }

    await getDatabase().employee.update({
      where: {
        id: employee.id,
      },
      data: {
        emailVerified: true,
      },
    });

    return (
      <>
        <div className="grid h-screen w-screen place-items-center overflow-hidden">
          <p className="text-lime-700">
            Your email has been verified successfully, Please login again!!!
          </p>
        </div>
      </>
    );
  } catch (error) {
    return redirect("/");
  }
}
