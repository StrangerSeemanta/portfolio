import Link from "next/link";
import React from "react";
import { Github, Link as LinkIcon, Linkedin, Mail, Youtube, Twitter, FacebookIcon } from "lucide-react";
import { SocialData } from "@/lib/db/socialdata";
import SocialHandlers from "@/socialHandlerLinks_Static.json";
import clsx from "clsx";

function SocialHeadsStatic() {
    const socialData:SocialData[]=JSON.parse(JSON.stringify(SocialHandlers)) as unknown as SocialData[];
  return (
    <React.Fragment>
      {socialData &&
        socialData.map(({ href, label }, index) => {
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
              Icon = LinkIcon;
          }
          return (
            <Link
              key={Date.now().toString() + index.toString()}
              href={href}
              target="_blank"
              className={clsx(
                "p-5 glass-card rounded-full group hover-glow transition-all duration-300",
              )}
              aria-label={label}
            >
              <Icon className="w-10 h-10 text-gray-300 transition-all duration-300 group-hover:text-[#00b4d8]" />
            </Link>
          );
        })}
    </React.Fragment>
  );
}

export default SocialHeadsStatic;
