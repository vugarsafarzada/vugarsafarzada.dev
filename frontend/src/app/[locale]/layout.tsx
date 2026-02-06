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

const normalizeBaseUrl = (value?: string) => {
  if (!value) return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

const getHealthUrl = () => {
  const base =
    normalizeBaseUrl(process.env.API_BASE_URL) ||
    normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL) ||
    "http://localhost:5555/api";

  return `${base}/v1/health`;
};

const checkHealth = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(getHealthUrl(), {
      cache: "no-store",
      signal: controller.signal,
    });

    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isHealthy = await checkHealth();

  if (!isHealthy) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
        <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Temporary unavailable
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            We&apos;ll be back soon
          </h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            The service is currently offline. Please try again in a few minutes.
          </p>
        </div>
      </div>
    );
  }

  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <AppProviders locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </AppProviders>
  );
}
