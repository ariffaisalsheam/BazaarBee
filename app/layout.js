import "../styles/index.css";
import "../styles/location-picker.css";
import { CartProvider } from "../hooks/useCart";
import { LanguageProvider } from "../hooks/useLanguage";
import Header from "../components/Header";

export const metadata = {
  title: "BazaarBee - Authentic Monthly Grocery Shopping in Rangpur",
  description: "BazaarBee is Rangpur's trusted local e-commerce platform for authentic monthly groceries, branded essentials, and scheduled deliveries at competitive prices.",
  keywords: "grocery, monthly bazaar, Rangpur, authentic products, scheduled delivery, BazaarBee",
  manifest: '/site.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="site-main">
              {children}
            </main>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
