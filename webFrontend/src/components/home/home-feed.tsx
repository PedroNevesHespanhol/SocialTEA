"use client"
import { axiosInstance } from "@/server/api";
import { Post } from "@/types/post";
import { useState, useEffect } from "react";
import { PostItem } from "../post/post-item";

export const HomeFeed = () => {
   const [posts, setPosts] = useState<Post[]>([]);
   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const response = await axiosInstance.get(`/feed`, {
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
         {posts.map((post) => (
            <PostItem key={post.id} post={post} />
         ))}
      </div>
   );
};
