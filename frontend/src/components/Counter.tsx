"use client";

import { useTranslations } from "next-intl";
import { decrement, increment } from "@/store/slices/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Counter() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.counter.value);

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-zinc-500">
        {t("home.counter")}
      </p>
      <div className="text-3xl font-semibold text-zinc-900">{value}</div>
      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
          onClick={() => dispatch(increment())}
          type="button"
        >
          {t("home.increment")}
        </button>
        <button
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-300"
          onClick={() => dispatch(decrement())}
          type="button"
        >
          {t("home.decrement")}
        </button>
      </div>
    </div>
  );
}
