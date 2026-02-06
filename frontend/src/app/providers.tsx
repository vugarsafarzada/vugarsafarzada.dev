"use client";

import type { ReactNode } from "react";
import {
  NextIntlClientProvider,
  type AbstractIntlMessages,
} from "next-intl";
import { ThemeProvider } from "next-themes";
import StoreProvider from "@/store/provider";

type AppProvidersProps = {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: string;
};

export default function AppProviders({
  children,
  locale,
  messages,
  timeZone,
}: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone={timeZone}
        >
          {children}
        </NextIntlClientProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
