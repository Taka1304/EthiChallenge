"use client";

import { Provider } from "jotai";
import { UIProvider } from "@yamada-ui/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <Provider>{children}</Provider>
    </UIProvider>
  );
}
