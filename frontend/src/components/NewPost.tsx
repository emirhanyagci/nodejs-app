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

import { createPost } from "../api/postApi";
import { useState } from "react";
export default function NewPost() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  async function submitPost() {
    createPost(title, imageUrl, content)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">New Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-lg" htmlFor="newPostTitle">
              Title
            </Label>
            <Input
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
              onChange={(e) => setImageUrl(e.target.value)}
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
