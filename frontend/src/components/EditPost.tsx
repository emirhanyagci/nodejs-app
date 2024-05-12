/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types/post";
import { useState } from "react";
import { updatePost } from "@/api/postApi";
import { useUserContext } from "@/context/UserContext";
export default function EditPost({
  children,
  post,
  setPosts,
}: {
  children: React.ReactNode;
  post: Post;
  setPosts: any;
}) {
  const [title, setTitle] = useState(post.title);
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState(post.content);
  const [dialogOpen, setDialogOpen] = useState(false);

  const userContext = useUserContext();
  async function submitPost() {
    updatePost(post._id, title, image, content, userContext?.user.token)
      .then((res) => {
        setPosts((oldPosts: any) => {
          const updatedPost = oldPosts.map((item: Post) => {
            if (item._id !== res.post._id) return item;
            return res.post;
          });
          return updatedPost;
        });
        setDialogOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-lg" htmlFor="newPostTitle">
              Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              id="newPostTitle"
              type="text"
            ></Input>
          </div>
          <div className="space-y-2">
            <Label className="text-lg" htmlFor="newPostImage">
              Image
            </Label>
            <Input
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              className=""
              id="newPostImage"
              type="file"
            ></Input>
          </div>
          <div className="space-y-2">
            <Label className="text-lg" htmlFor="newPostContent">
              Content
            </Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="newPostContent"
              placeholder="Enter content of post"
            ></Textarea>
          </div>
        </div>
        <DialogFooter className="flex-row justify-end">
          <DialogTrigger asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogTrigger>
          <Button onClick={submitPost} variant="ghost">
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
