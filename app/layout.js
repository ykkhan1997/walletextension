import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] });
import Header from '@/components/Header';
import Main from './main/page';
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <Main>
      <Header/>
      {children}
      </Main>
      </body>
    </html>
  )
}
