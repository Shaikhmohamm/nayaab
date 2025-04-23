import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata = {
  title: "Nayaab Enterprises",
  description: "Welcome to Nayaab Enterprises",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
