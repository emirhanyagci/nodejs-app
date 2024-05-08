import NewPost from "@/components/NewPost";
import Posts from "@/components/Posts";
import UpdateStatus from "@/components/UpdateStatus";

export default function Home() {
  return (
    <div className="flex justify-center items-center gap-4 flex-col w-full">
      <UpdateStatus />
      <NewPost />
      <Posts />
    </div>
  );
}
