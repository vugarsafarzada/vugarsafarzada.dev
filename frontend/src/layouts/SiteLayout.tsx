import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
              {subtitle ? (
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {subtitle}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <span className="text-foreground">{t("nav.home")}</span>
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
