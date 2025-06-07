import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ScrollIndicator } from '@/components/scroll-indicator';
import Drag from '@/components/custom-cursor';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Shuvo Sarker - Full-Stack Developer',
  description: 'Passionate full-stack developer specializing in MERN stack, building scalable web applications with modern technologies.',
  keywords: ['Full-Stack Developer', 'MERN Stack', 'React', 'Node.js', 'MongoDB', 'TypeScript'],
  authors: [{ name: 'Shuvo Sarker' }],
  creator: 'Shuvo Sarker',
  publisher: 'Shuvo Sarker',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shuvosarker-portfolio.com',
    title: 'Shuvo Sarker - Full-Stack Developer',
    description: 'Passionate full-stack developer specializing in MERN stack',
    siteName: 'Shuvo Sarker Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shuvo Sarker - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shuvo Sarker - Full-Stack Developer',
    description: 'Passionate full-stack developer specializing in MERN stack',
    creator: '@shuvosarker',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Drag />
          <ScrollIndicator />
          <div className="min-h-screen bg-[#0a0a0a] grid-pattern">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}