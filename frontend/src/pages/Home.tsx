import NewPost from "@/components/NewPost";
import UpdateStatus from "@/components/UpdateStatus";

export default function Home() {
  return (
    <div className="flex justify-center items-center gap-4 flex-col">
      <UpdateStatus />
      <NewPost />
    </div>
  );
}
