import React from "react";
import Image from "next/image";
import ImageUrl from "@/public/headshot_min.png"
function ProfileImage() {
  return (
    <>
      {/* Profile Image */}
      <div
        // initial={{ scale: 0, rotate: -180 }}
        // animate={{ scale: 1, rotate: 0 }}
        // transition={{ duration: 1, delay: 0.2 }}
        className="relative mx-auto w-40 h-40 mb-4"
      >
        <div className="w-full h-full rounded-full glass-card p-2">
          <Image
            width={192}
            height={192}
            src={ImageUrl}
            alt="Shuvo Sarker"
            priority={true}
            className="w-full h-full rounded-full object-cover grayscale"
          />
        </div>
      </div>
    </>
  );
}

export default ProfileImage;
