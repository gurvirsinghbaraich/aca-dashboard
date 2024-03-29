import EmailVerificationTemplate from "@/emails/EmailVerificationTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationEmail = async function ({
  url,
  email,
}: {
  url: string;
  email: string;
}) {
  await resend.emails.send({
    to: email,
    from: "noreply@isyour.site",
    subject: "Onboarding Verification",
    react: <EmailVerificationTemplate url={url} />,
  });
};
