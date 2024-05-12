export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  creator: { _id: string; name: string };
  createdAt: Date;
}
