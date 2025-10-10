import type { Metadata } from "next";
import "@itwin/itwinui-react/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "iTwin Viewer - Next.js",
  description: "iTwin Viewer running in Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="iui-root">
      <body
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main style={{ display: "flex", flex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
