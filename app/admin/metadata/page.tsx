import AboutMetadata from "./AboutMetadata";
import SocialMetadata from "./SocialMetadata";

async function MetaDataPage() {
  return (
    <section>
      <div className="font-mono p-2 flex flex-wrap gap-4 justify-center items-start">
        <SocialMetadata />
        <AboutMetadata />
      </div>
    </section>
  );
}

export default MetaDataPage;
