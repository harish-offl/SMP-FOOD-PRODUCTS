import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/store/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'SMP Food Products | Premium Traditional Nutrition',
    template: '%s | SMP Food Products',
  },
  description:
    'Shop SMP Food Products online. Premium banana malt, millet blends, health mixes, and traditional nutrition products made with natural ingredients for healthier families.',
  metadataBase: new URL('https://smpfoodproducts.com'),
  icons: {
    icon: '/images/smp-logo.png',
    shortcut: '/images/smp-logo.png',
    apple: '/images/smp-logo.png',
  },
  openGraph: {
    title: 'SMP Food Products | Premium Traditional Nutrition',
    description:
      'Premium South Indian natural food products for family wellness and everyday nourishment.',
    type: 'website',
    siteName: 'SMP Food Products',
    images: ['/images/smp-logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  keywords: [
    'SMP Food Products',
    'Banana Malt',
    'Health Mix',
    'Millet Products',
    'Traditional Nutrition',
    'South Indian Food',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
