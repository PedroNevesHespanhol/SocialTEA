"use client";

import { User } from "@/types/user";
import Link from "next/link";
import { Button } from "./button";
import { useState } from "react";

type RecommendationItemProps = {
   user: User;
};

export const RecommendationItem = ({ user }: RecommendationItemProps) => {
   const [following, setFollowing] = useState(false);

   const handleFollowButton = () => {
      setFollowing(true);
   };

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
            <div className="truncate text-sm text-gray-400">@{user.slug}</div>
         </div>
         <div className="pl-2 w-20">
            {!following && (
               <Button label="Seguir" onClick={handleFollowButton} size={3} />
            )}
         </div>
      </div>
   );
};