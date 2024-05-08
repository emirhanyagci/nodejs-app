export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  creator: { name: string };
  createdAt: Date;
}
