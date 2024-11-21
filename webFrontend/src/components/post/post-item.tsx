"use client";

import { Post } from "@/types/post";
import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons/faHeartPulse";
import { faRetweet } from "@fortawesome/free-solid-svg-icons/faRetweet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

type PostItemProps = {
   post: Post;
   hideComments?: boolean;
};

export const PostItem = ({ post, hideComments }: PostItemProps) => {
   const [liked, setLiked] = useState(true);

   const handleLikeButton = () => {
      setLiked(!liked);
   };

   return (
      <div className="flex gap-2 p-6 border-b-2 border-gray-900">
         <div>
            <Link href={`/${post.user.slug}`}>
               <img
                 className="size-10 rounded-full"
                 src={post.user.avatar}
                 alt={post.user.name}
               />
            </Link>
         </div>
         <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-3">
               <div className="font-regular text-lg">
                  <Link href={`/${post.user.slug}`}>{post.user.name}</Link>
               </div>
               <div className="text-xs text-gray-500">
                  @{post.user.slug}
               </div>
            </div>
            <div className="py-4 text-lg">{post.body}</div>
            {post.image && (
               <div className="w-full">
                  <img
                     className="w-full rounded-2xl"
                     src={post.image}
                     alt=""
                  />
               </div>
            )}
            <div className="flex mt-6 text-gray-500">
               {!hideComments && (
                  <div className="flex-1">
                     {/* so faltou aqui */}
                     <Link href={`/post/${post.id}`}>
                        <div className="inline-flex items-center gap-2 cursor-pointer">
                           <FontAwesomeIcon
                              className="size-6"
                              icon={faComment}
                           />
                           <div className="text-lg">{1}</div>
                        </div>
                     </Link>
                  </div>
               )}
               <div className="flex-1">
                  <div className="inline-flex items-center gap-2 cursor-pointer">
                     <FontAwesomeIcon className="size-6" icon={faRetweet} />
                     <div className="text-lg">{2}</div>
                  </div>
               </div>
               <div className="flex-1">
                  <div
                     className={`inline-flex items-center gap-2 cursor-pointer 
                        ${liked && "text-red-400"}`}
                     onClick={handleLikeButton}
                  >
                     <FontAwesomeIcon
                        className="size-6"
                        icon={liked ? faHeartPulse : faHeart}
                     />
                     <div className="text-lg">{3}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};