import { PostItem } from "@/components/post/post-item";
import { PostPost } from "@/components/post/post-post";
import { GeneralHeader } from "@/components/ui/general-header";
import { axiosInstance } from "@/server/api";
import { Post } from "@/types/post";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PostPage() {
   const [post, setPost] = useState<Post>();
   const router = useRouter();
   const { id } = router.query;
   console.log('id', id);

   useEffect(() => {
      const fetchPost = async () => {
         if (!id) return;
         try {
            const response = await axiosInstance.get(`/post/${id}`, {
               headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`
               }
            });
            setPost(response.data.post);
         } catch (error) {
            console.error("Error fetching post:", error);
         }
      };

      fetchPost();
   }, [id]);
   /* so faltou aqui */
   const handleCommentClick = (postId: string) => {
      router.push(`/post/${postId}`);
   };

   return (
      <div>
         <GeneralHeader backHref="/home">
            <div className="font-regular text-lg">Voltar</div>
         </GeneralHeader>
         <div className="border-t-2 border-gray-900">
            {post && (
               <>
                  <PostItem key={post.id} post={post} />
                  <div className="border-y-8 border-gray-900">
                     <PostPost />
                  </div>
                  <PostItem key={post.id} post={post} hideComments />
               </>
            )}
         </div>
      </div>
   );
}
