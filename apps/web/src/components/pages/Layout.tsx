import { ReactNode } from "react";

import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
  navbar?: ReactNode;
  footer?: ReactNode;
}

export default function Layout({
  children,
  navbar = null,
  footer = null,
}: LayoutProps) {
  return (
    <div>
      <Head>
        <title>baily.io</title>
        <meta name="description" content="Baily's personal site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {navbar}

      {children}

      {footer}
    </div>
  );
}
