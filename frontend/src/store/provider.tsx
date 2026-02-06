"use client";

import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { store } from "./index";

type StoreProviderProps = {
  children: ReactNode;
};

export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
