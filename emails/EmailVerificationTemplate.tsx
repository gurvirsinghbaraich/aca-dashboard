import { Button } from "@react-email/button";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

export default function EmailVerificationTemplate({ url }: { url: string }) {
  return (
    <Html>
      <Head />
      <Preview>Verify Your Email Address</Preview>
      <Tailwind>
        <Section
          className="bg-white p-4"
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          <Text>
            Please verify your email address by clicking on the link below:
          </Text>
          <Button
            className="bg-gray-200 p-2 font-mono underline decoration-dotted"
            href={url}
          >
            {url}
          </Button>
        </Section>
      </Tailwind>
    </Html>
  );
}
