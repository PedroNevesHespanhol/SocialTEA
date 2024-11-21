"use client";

import { Input } from "@/components/ui/input";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/server/api";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PostPost = () => {
   const userData: User = {
      slug: "",
      name: "",
      avatar: "",
      cover: "",
      bio: "",
      link: ""
   }
   const router = useRouter();
   const [user, setUserData] = useState(userData);

   useEffect(() => {
      const getUserData = async () => {
         try {
            const response = await axiosInstance.get(`/user/${sessionStorage.getItem('userSlug')}`, {
               headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`
               }
            });
            const data = response.data.user;
            if (data) {
               setUserData(data);
            }
         } catch (error) {
            console.error("Failed to fetch user data", error);
         }
      };

      getUserData();
   }, []);
   const handleImageUpload = () => {};
   
   const [postBody, setPostBody] = useState('');
   const handlePostClick = async () => {
      try {
          const response = await axiosInstance.post(`/post`, {
            body: postBody
          }, {
            headers: {
               Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          });
         if (response.status === 200) {
            toast.success("Post Criado com sucesso");
            router.replace("/home");
         } else {
            console.error("Erro ao criar post", response.data.error.name);
            let errorMessage = "Erro ao criar post"
            toast.error(errorMessage);
         }
      } catch (error) {
         console.error("Erro ao criar post", error);
         toast.error("Erro ao criar post");
      }
   };

   return (
      <div className="flex gap-6 px-8 py-6 border-b-2 border-gray-900">
         <div>
            <img
               className="size-12 rounded-full"
               src={user.avatar}
               alt={user.name}
            />
         </div>
         <div className="flex-1">
            {/* <div
               className="min-h-14 outline-none text-lg text-white empty:before:text-gray-500 empty:before:content-[attr(data-placeholder)]"
               contentEditable
               role="textbox"
               data-placeholder="O que você está pensando?"
            > */}
               <Input
                  placeholder="O que você está pensando?"
                  value={postBody}
                  onChange={(t) => setPostBody(t)}
               />
            {/* </div> */}
            <div className="flex justify-between items-center mt-2">
               <div className="cursor-pointer" onClick={handleImageUpload}>
                  <FontAwesomeIcon className="size-6" icon={faImage} />
               </div>
               <div className="w-28">
                  <Button label="Postar" size={2} onClick={handlePostClick} />
               </div>
            </div>
         </div>
      </div>
   );
};
