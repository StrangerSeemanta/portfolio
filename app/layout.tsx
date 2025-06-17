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
  metadataBase: new URL("https://shuvosarker.vercel.app"),
  title: 'Shuvo Sarker | Full-Stack Developer, AI Agent Specialist & Next.js Expert',
  description:
    'Full-stack developer and AI agent specialist creating intelligent, scalable apps using Next.js, Convex, Firebase & MongoDB. Helping businesses innovate with automation, AI, and modern cloud solutions.',
  keywords: [
    'Full-Stack Developer',
    'AI Agent Developer',
    'AI Developer',
    'Artificial Intelligence',
    'Next.js Expert',
    'Convex',
    'Firebase',
    'MongoDB',
    'MERN Stack',
    'React',
    'Node.js',
    'TypeScript',
    'AI Solutions',
    'AI SaaS',
    'Web Application',
    'Cloud Development',
    'Generative AI',
    'AI Automation',
    'Software Engineer Portfolio',
    'Next.js Portfolio Developer',
    'Shuvo Sarker Portfolio'
  ],
  authors: [{ name: 'Shuvo Sarker' }],
  creator: 'Shuvo Sarker',
  publisher: 'Shuvo Sarker',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shuvosarker-portfolio.com',
    title: 'Shuvo Sarker | Full-Stack Developer, AI Agent Specialist & Next.js Expert',
    description:
      'Explore Shuvo Sarker’s portfolio featuring cutting-edge AI agents, scalable full-stack apps, and modern cloud systems. Built with Next.js, Convex, Firebase & more.',
    siteName: 'Shuvo Sarker Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shuvo Sarker - Full-Stack Developer & AI Expert Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shuvo Sarker | Full-Stack Developer, AI Agent Specialist & Next.js Expert',
    description:
      'Full-stack engineer and AI agent builder using Next.js, Convex, Firebase & modern web stacks. Explore scalable, intelligent applications.',
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