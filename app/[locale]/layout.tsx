import { getMessages } from "next-intl/server";
import { Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={space_grotesk.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
