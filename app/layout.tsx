import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <Header />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
