import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '../components/Header';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Uber Clone',
  description: 'Uber clone with utilities',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
