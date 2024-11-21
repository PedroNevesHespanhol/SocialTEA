import { User } from "./user";

export type Post = {
   id: number;
   user: User;
   body: string;
   image?: string;
   // likeCount: number;
   // commentCount: number;
   // repostCount: number;
   liked: boolean;
   // reposted: boolean;
   createdAt: Date;
};
