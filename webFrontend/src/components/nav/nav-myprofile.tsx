"use client"
import { axiosInstance } from "@/server/api"; // Importe o axiosInstance
import { User } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";

const userData: User = {
   slug: "",
   name: "",
   avatar: "",
   cover: "",
   bio: "",
   link: ""
}

export const NavMyProfile = () => {
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

   return (
      <div className="flex items-center">
         <div className="size-10 mr-2 rounded-full overflow-hidden">
            <Link href={`/${user.slug}`}>
               <img className="size-full" src={user.avatar} alt={user.name} />
            </Link>
         </div>
         <div className="flex-1 overflow-hidden">
            <Link className="block truncate" href={`/${user.slug}`}>
               {user.name}
            </Link>
            <div className="text-sm text-gray-400 truncate">@{user.slug}</div>
         </div>
      </div>
   );
};
