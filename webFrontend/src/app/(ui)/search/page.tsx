"use client";

import { SearchInput } from "@/components/nav/search-input";
import { PostItem } from "@/components/post/post-item";
import { GeneralHeader } from "@/components/ui/general-header";
import { axiosInstance } from "@/server/api";
import { Post } from "@/types/post";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

type SearchPageProps = {
   searchParams: {
      q: string | undefined;
   };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
   if (!searchParams.q) redirect("/");
   const [posts, setPosts] = useState<Post[]>([]);
   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const response = await axiosInstance.get(`/search`, {
               params: { q: searchParams.q },
               headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`
               }
            });
            setPosts(response.data.posts);
         } catch (error) {
            console.error("Error fetching posts:", error);
         }
      };
   
      fetchPosts();
   }, []);

   return (
      <div>
         <GeneralHeader backHref="/home">
            <SearchInput defaultValue={searchParams.q} />
         </GeneralHeader>
         <div className="border-t-2 border-gray-900">
            {posts.map((post) => (
               <PostItem key={post.id} post={post} />
            ))}
         </div>
      </div>
   );
}
