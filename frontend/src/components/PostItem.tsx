import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";
import type { Post } from "@/types/post";
import { useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import { deletePost } from "@/api/postApi";
export default function PostItem({ post }: { post: Post }) {
  const navigate = useNavigate();
  function deleteHandler() {
    deletePost(post._id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          Posted by {post.creator.name} to
          {new Date(post.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <div className="space-x-4">
          <Button
            variant="ghost"
            onClick={() => {
              navigate(`/${post._id}`);
            }}
          >
            View
          </Button>
          <EditPost post={post}>Edit</EditPost>

          <Button variant="destructive" onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
