"use client";
import { RecommendationItem } from "./recommendation-item";
import { RecommendationItemSkeleton } from "./skeleton/recommendation-item-skeleton";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/server/api";
import { User } from "@/types/user";

export const RecommendationArea = () => {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const response = await axiosInstance.get("/suggestions");
            setUsers(response.data);
         } catch (error) {
            console.error("Error fetching suggestions:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchUsers();
   }, []);

   return (
      <div className="bg-gray-700 rounded-3xl">
         <h2 className="text-xl p-6">Quem seguir</h2>
         <div className="flex flex-col gap-4 p-6 pt-0">
            {loading ? (
               <RecommendationItemSkeleton />
            ) : (
               users.map((user) => <RecommendationItem key={user.slug} user={user} />)
            )}
         </div>
      </div>
   );
};
