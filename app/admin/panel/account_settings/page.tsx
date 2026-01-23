import {UserProfile} from "@clerk/nextjs"
export default function AdminProfileDetails() {
  return (
      <div className="userDetailsHolder w-full h-fit flex justify-center items-center">
        <UserProfile />
      </div>
  );
}