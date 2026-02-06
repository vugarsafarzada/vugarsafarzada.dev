import { notFound } from "next/navigation";
import { getMessages, getTimeZone } from "next-intl/server";
import AppProviders from "@/app/providers";
import { isLocale, routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <AppProviders locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </AppProviders>
  );
}
