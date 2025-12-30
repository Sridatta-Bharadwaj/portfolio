"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Flex } from "@once-ui-system/core";
import { Footer, Header, RouteGuard } from "@/components";

export const LayoutContent = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isCliPage = pathname === "/cli";

  if (isCliPage) {
    return <RouteGuard>{children}</RouteGuard>;
  }

  return (
    <>
      <Flex fillWidth minHeight="16" s={{ hide: true }} />
      <Header />
      <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
        <Flex horizontal="center" fillWidth minHeight="0">
          <RouteGuard>{children}</RouteGuard>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};
