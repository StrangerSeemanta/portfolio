"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Link, Linkedin, Mail, Youtube, Twitter, FacebookIcon } from "lucide-react";
import { SocialDataWithObjectId } from "@/lib/db/socialdata";
import { toast } from "sonner";
import clsx from "clsx";

function SocialHeadsDynamic() {
  const [socialData, setSocialData] = useState<SocialDataWithObjectId[] | null>(
    null,
  );
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
      const data =
        (await response.json()) as unknown as SocialDataWithObjectId[];
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
    <Fragment>
      {loadingSocialData ? (
        <div className="p-5 glass-card rounded-full  animate-pulse">
          <div className="w-10 h-10"></div>
        </div>
      ) : (
        socialData &&
        socialData.map(({ href, label, _id }, index) => {
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
              break;
            case "facebook":
              Icon = FacebookIcon;
              break;
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
              key={_id.toString("hex") + Date.now().toString()}
              href={href}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={clsx(
                "p-5 glass-card rounded-full group hover-glow transition-all duration-300",
              )}
              aria-label={label}
            >
              <Icon className="w-10 h-10 text-gray-300 transition-all duration-300 group-hover:text-[#00b4d8]" />
            </motion.a>
          );
        })
      )}
    </Fragment>
  );
}

export default SocialHeadsDynamic;
