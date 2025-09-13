import Image from "next/image";
import BackButton from "@/components/BackButton";

export default async function ProjectPage(props: {
  params: Promise<{ img: string }>;
}) {
  const { img } = await props.params;
  return (
    <>
      <section className="text-black flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center justify-center  mb-6 space-x-5">
          <div className="my-6">
            <BackButton />
          </div>
          <h1 className="text-3xl font-bold">Project Image</h1>
        </div>
        <div className="max-w-2xl w-full h-full px-3 py-6">
          <Image
            src={atob(decodeURIComponent(img))}
            alt="Project Image"
            width={800}
            height={450}
            className=" shadow-sm object-cover w-full h-auto"
            priority
          />
        </div>
      </section>
    </>
  );
}
