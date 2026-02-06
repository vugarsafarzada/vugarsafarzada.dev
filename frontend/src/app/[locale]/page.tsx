import { useTranslations } from "next-intl";
import Counter from "@/components/Counter";
import SiteLayout from "@/layouts/SiteLayout";

export default function HomePage() {
  const t = useTranslations();

  return (
    <SiteLayout title={t("home.title")} subtitle={t("home.subtitle")}>
      <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">
            {t("home.description")}
          </p>
          <div className="grid gap-3 text-sm text-zinc-600">
            <div>Next.js App Router</div>
            <div>Nx workspace with pnpm</div>
            <div>Docker-first workflow</div>
            <div>Redux Toolkit + i18n ready</div>
          </div>
        </div>
        <Counter />
      </section>
    </SiteLayout>
  );
}
