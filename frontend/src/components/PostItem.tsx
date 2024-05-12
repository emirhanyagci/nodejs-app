/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useUserContext } from "@/context/UserContext";
export default function PostItem({
  post,
  setPosts,
}: {
  post: Post;
  setPosts: any;
}) {
  console.log(post);

  const navigate = useNavigate();
  const userContext = useUserContext();
  const creatorId = post.creator._id;
  const userId = userContext?.user.userId;
  function deleteHandler() {
    deletePost(post._id, userContext?.user.token)
      .then(() => {
        setPosts((oldPosts: any) => {
          const newPosts = oldPosts.filter(
            (item: Post) => item._id !== post._id
          );
          return newPosts;
        });
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
          {userId === creatorId && (
            <>
              <EditPost setPosts={setPosts} post={post}>
                Edit
              </EditPost>
              <Button variant="destructive" onClick={deleteHandler}>
                Delete
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
