"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullScreenRoute =
    pathname?.startsWith("/workspace/") || pathname?.startsWith("/shared/");

  if (isFullScreenRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col pt-18">{children}</div>
    </>
  );
}
