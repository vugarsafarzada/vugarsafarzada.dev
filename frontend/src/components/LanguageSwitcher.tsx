"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;

    if (!pathname) {
      router.push(`/${nextLocale}`);
      return;
    }

    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
  };

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-zinc-600">
      <span className="sr-only">{t("language.label")}</span>
      <select
        className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
        value={locale}
        onChange={handleChange}
      >
        {routing.locales.map((supportedLocale) => (
          <option key={supportedLocale} value={supportedLocale}>
            {supportedLocale.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
