import { ReactNode } from "react";
import Header from "../components/Header";
import Providers from "../providers";

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Providers>
      <Header />
      <main className="p-6">{children}</main>
    </Providers>
  );
}
