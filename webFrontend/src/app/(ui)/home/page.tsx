import { HomeFeed } from "@/components/home/home-feed";
import { HomeHeader } from "@/components/home/home-header";
import { PostPost } from "@/components/post/post-post";

export default function HomePage() {
   return (
      <div>
         <HomeHeader />
         <PostPost />
         <HomeFeed />
      </div>
   );
}
