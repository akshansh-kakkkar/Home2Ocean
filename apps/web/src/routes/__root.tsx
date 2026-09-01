import { trpc } from "@/utils/trpc";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { Toaster } from "sonner";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

export interface RouterAppContext {
    trpc : typeof trpc,
    queryClient : QueryClient
}

export const Route = createRootRoute({
    component : ()=> <Outlet />
})

function RootComponent() {
  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <div className="grid grid-rows-[auto_1fr] h-svh">
          <Header />
          <Outlet />
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
    </>
  );
}