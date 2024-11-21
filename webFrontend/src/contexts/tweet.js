"use client"
import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const postService = new PostService();

  useEffect(() => {
      postService.getPosts()
         .then((response) => {
            setPosts(response.data)
            console.log(response.data)
         }).catch((error) => {
            console.log(error)
         })
  }, []);

  return (
   <PostContext.Provider value={{ posts, loading }}>
      {children}
   </PostContext.Provider>
  );
};
