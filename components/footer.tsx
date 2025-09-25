"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
  Link,
} from "lucide-react";
import BorderLine from "./BorderLine";
import { toast } from "sonner";
import { SocialData } from "@/lib/db/socialdata";
import { useCallback, useEffect, useState } from "react";

// const socialLinks = [
//   { icon: Github, href: "https://github.com", label: "GitHub" },
//   { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
//   { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
//   { icon: Mail, href: "mailto:shuvo@example.com", label: "Email" },
// ];

export function Footer() {
  const [socialData, setSocialData] = useState<SocialData[] | null>(null);
  const [loadingSocialData, setLoadingSocialData] = useState(false);
  const socialMediaData = useCallback(async () => {
    try {
      setLoadingSocialData(true);
      const response = await fetch("/api/socials/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, response.statusText);
      if (!response.ok) throw new Error("Response was not OK!");
      const data = (await response.json()) as unknown as SocialData[];
      setSocialData(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load social media data", {
        description: String(error),
      });
    } finally {
      setLoadingSocialData(false);
    }
  }, []);

  useEffect(() => {
    socialMediaData();
  }, [socialMediaData]);
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-2"
            >
              <span className="text-2xl font-bold gradient-text">
                Shuvo Sarker
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 text-sm"
            >
              © 2025 Shuvo Sarker. All rights reserved.
            </motion.p>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex space-x-6"
          >
            {loadingSocialData ? (
              <div className="p-2 glass-card rounded-full animate-pulse"><div className="w-5 h-5"></div></div>
            ) : (
              socialData &&
              socialData.map(({ href, label,_id }, index) => {
                let Icon;
                switch (label.trim().toLowerCase()) {
                  case "github":
                    Icon = Github;
                    break;
                  case "linkedin":
                    Icon = Linkedin;
                    break;
                  case "twitter":
                    Icon = Twitter;
                  case "email":
                    Icon = Mail;
                    break;
                  case "youtube":
                    Icon = Youtube;
                    break;
                  default:
                    Icon = Link;
                }
                return (
                  <motion.a
                    key={_id.toString("hex")+Date.now().toString()}
                    href={href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 glass-card rounded-full hover-glow transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-gray-300 hover:text-[#00b4d8]" />
                  </motion.a>
                );
              })
            )}
          </motion.div>

          {/* Made with Love */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center text-gray-400 text-sm"
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="mx-2"
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>and lots of coffee</span>
          </motion.div>
        </div>

        <BorderLine />
      </div>
    </footer>
  );
}
