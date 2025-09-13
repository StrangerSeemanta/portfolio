import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shuvosarker.vercel.app"),
  title: {
    default:
      "Shuvo Sarker | AI Agent Builder, Python Enthusiast, Full-stack Developer and explorer of digital experiences",
    template: "%s | Shuvo Sarker Portfolio",
  },
  description:
    "Explore Shuvo Sarker as AI Agent Builder, Python Enthusiast, and Full-stack Developer. Transform your ideas into dynamic digital experiences with cutting-edge technology, creativity, and a relentless drive for excellence.",

  authors: [{ name: "Shuvo Sarker", url: "https://shuvosarker.vercel.app" }],
  creator: "Shuvo Sarker",
  publisher: "Shuvo Sarker",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  applicationName: "Shuvo Sarker Portfolio",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://shuvosarker.vercel.app",
    languages: {
      "en-US": "https://shuvosarker.vercel.app",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shuvosarker.vercel.app",
    title:
      "Shuvo Sarker | AI Agent Builder, Python Enthusiast, Full-stack Developer and explorer of digital experiences",
    description:
      "Explore Shuvo Sarker as AI Agent Builder, Python Enthusiast, and Full-stack Developer. Transform your ideas into dynamic digital experiences with cutting-edge technology, creativity, and a relentless drive for excellence.",
    siteName:
      "Shuvo Sarker Portfolio - AI Agent Builder, Python Enthusiast, Full-stack Developer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shuvo Sarker - Digital Experience Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shuvo Sarker | AI Agent Builder, Python Enthusiast, Full-stack Developer and explorer of digital experiences",
    description:
      "Explore Shuvo Sarker as AI Agent Builder, Python Enthusiast, and Full-stack Developer. Transform your ideas into dynamic digital experiences with cutting-edge technology, creativity, and a relentless drive for excellence.",
    creator: "@SSARKERDEV",
    images: ["/og-image.jpg"],
  },
  generator: "Next.js",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  keywords: [
    "Full-Stack Developer",
    "AI Agent Developer",
    "AI Agent Builder",
    "Python Enthusiast",
    "AI Developer",
    "Artificial Intelligence",
    "Next.js Expert",
    "Web Application",
    "Cloud Development",
    "Generative AI",
    "AI Automation",
    "Software Engineer Portfolio",
    "Portfolio Developer",
    "Shuvo Sarker Portfolio",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "AI Solutions",
    "AI Agent Solutions",
    "AI Agent Builder Portfolio",
    "AI Agent Builder Shuvo Sarker",
    "Shuvo Sarker AI Agent Builder",
    "Shuvo Sarker Full-Stack Developer",
    "Shuvo Sarker Python Enthusiast",
    "Shuvo Sarker AI Developer",
    "Shuvo Sarker Software Engineer",
    "Shuvo Sarker Portfolio",
    "Shuvo Sarker Web Developer",
    "Shuvo Sarker AI Solutions",
    "Shuvo Sarker AI Agent Solutions",
    "Shuvo Sarker AI Automation",
    "Shuvo Sarker Generative AI",
    "Shuvo Sarker Cloud Development",
    "Shuvo Sarker Next.js Expert",
    "Shuvo Sarker Web Application",
    "Shuvo Sarker MERN Stack Developer",
    "Shuvo Sarker React Developer",
    "Best AI Agent Builder",
    "Best AI Agent Developer",
    "Best Full-Stack Developer",
    "Best Python Enthusiast",
    "Best AI Developer",
    "Best Software Engineer Portfolio",
    "Best Portfolio Developer",
    "Best AI Solutions",
    "Best AI Agent Solutions",
    "Best AI Automation",
    "Best Generative AI",
    "Best Cloud Development",
    "Best Next.js Expert",
    "Best Web Application",
    "Best MERN Stack Developer",
    "Best React Developer",
    "Freelance AI Agent Builder",
    "Freelance AI Agent Developer",
    "Freelance Full-Stack Developer",
    "Freelance Python Enthusiast",
    "Freelance AI Developer",
    "Freelance Software Engineer Portfolio",
    "Freelance Portfolio Developer",
    "Freelance AI Solutions",
    "Freelance AI Agent Solutions",
    "Freelance AI Automation",
    "Freelance Generative AI",
    "Freelance Cloud Development",
    "Freelance Next.js Expert",
    "Freelance Web Application",
    "Freelance MERN Stack Developer",
    "Freelance React Developer",
    "Shuvo Sarker Freelance AI Agent Builder",
    "Shuvo Sarker Freelance AI Agent Developer",
    "Shuvo Sarker Freelance Full-Stack Developer",
    "Shuvo Sarker Freelance Python Enthusiast",
    "Shuvo Sarker Freelance AI Developer",
    "Shuvo Sarker Freelance Software Engineer Portfolio",
    "Python Developer",
    "AI Agent Builder Portfolio",
    "AI Agent Builder Shuvo Sarker",
    "Shuvo Sarker AI Agent Builder",
    "Shuvo Sarker Full-Stack Developer",
    "Best AI Agent Developer portfolio",
    "Best AI Agent Builder portfolio",
    "Best Full-Stack Developer portfolio",
    "Best Python Enthusiast portfolio",
    "Best AI Developer portfolio",
    "Best Software Engineer Portfolio portfolio",
    "Best Portfolio Developer portfolio",
    "Best AI Solutions portfolio",
    "Best AI Agent Solutions portfolio",
    "Best AI Automation portfolio",
    "Best Generative AI portfolio",
    "Best Freelancer AI Agent Builder portfolio",
    "Best Freelancer AI Agent Developer portfolio",
    "Best Freelancer Full-Stack Developer portfolio",
    "Best Freelancer Python Enthusiast portfolio",
    "Best Freelancer AI Developer portfolio",
    "Best Freelancer Software Engineer Portfolio portfolio",
    "Best Freelancer Portfolio Developer portfolio",
    "Best Freelancer AI Solutions portfolio",
    "Best Freelancer AI Agent Solutions portfolio",
    "Best Freelancer AI Automation portfolio",
    "Best Freelancer Generative AI portfolio",
    "Best Freelancer Cloud Development portfolio",
    "Best Freelancer Next.js Expert portfolio",
    "Best Freelancer Web Application portfolio",
    "Best Freelancer MERN Stack Developer portfolio",
    "Best Freelancer React Developer portfolio",
    "Shuvo Sarker Python Developer",
    "Shuvo Sarker AI Agent Builder Portfolio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
               
          <div className="min-h-screen bg-[#0a0a0a] grid-pattern">
            {children}
          </div>
          <Toaster />
      </body>
    </html>
  );
}
