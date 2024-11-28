import { LinksProvider, CurrentFormProvider } from "@/contexts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LinksProvider>{children}</LinksProvider>
      </body>
    </html>
  );
}
