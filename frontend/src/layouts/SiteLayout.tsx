import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type SiteLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export default function SiteLayout({
  children,
  title,
  subtitle,
}: SiteLayoutProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
              {subtitle ? (
                <p className="text-sm font-medium text-zinc-500">{subtitle}</p>
              ) : null}
            </div>
            <LanguageSwitcher />
          </div>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-zinc-600">
            <span>{t("nav.home")}</span>
            <span>{t("nav.about")}</span>
            <span>{t("nav.projects")}</span>
            <span>{t("nav.contact")}</span>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
