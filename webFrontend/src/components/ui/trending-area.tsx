"use client";
import { axiosInstance } from "@/server/api";
import { useState, useEffect } from "react";
import { TrendingItemSkeleton } from "./skeleton/trending-item-skeleton";
import { TrendingItem } from "./trending-item";
import { Trends } from "@/types/trends";


export const TrendingArea = () => {

   const [trends, setTrends] = useState<Trends[]>([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const response = await axiosInstance.get(`/trending`, {
               headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`
               }
            });
            setTrends(response.data.trends);
         } catch (error) {
            console.error("Error fetching posts:", error);
         } finally {
            setLoading(false);
         }
      };
   
      fetchPosts();
   }, []);
   return (
      <div className="bg-gray-700 rounded-3xl">
         <h2 className="text-xl p-6">O que está acontecendo?</h2>
         <div className="flex flex-col gap-4 p-6 pt-0">
         {loading ? (
               <TrendingItemSkeleton />
            ) : (
               trends.map((trend) => <TrendingItem label={trend.hashtag} count={trend.counter} />)
            )}
         </div>
      </div>
   );
};
