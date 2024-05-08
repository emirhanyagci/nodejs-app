import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import type { Post } from "@/types/post";
export default function PostItem({ post }: { post: Post }) {
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
          <Button variant="ghost">View</Button>
          <Button variant="ghost">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
