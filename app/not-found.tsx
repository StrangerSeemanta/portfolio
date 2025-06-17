import { ParticleField } from "@/components/particleField";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex justify-center items-center w-full bg-transparent">
      <ParticleField />
      <div className="flex flex-col items-center justify-center">
        <div className="text-center flex justify-center items-center space-x-3">
          <h1 className="text-3xl font-bold gradient-text">404</h1>
          <div className="h-12 w-[2px] bg-gradient-to-b from-primary to-secondary"></div>
          <h2 className="text-2xl font-semibold gradient-text ">
            Page Not Found
          </h2>
        </div>
        <Link href="/" className="mt-4">
          <Button size={"sm"} variant={"themed_glowing"}>
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
