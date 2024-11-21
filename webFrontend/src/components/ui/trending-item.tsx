import Link from "next/link";

type TrendingItemProps = {
   label: string;
   count: number;
};

export const TrendingItem = ({ label, count }: TrendingItemProps) => {
   return (
      <Link
         className="cursor-pointer group/item"
         href={`/search?q=${encodeURIComponent(label)}`}
      >
         <div className="group-hover/item:underline">{label}</div>
         <div className="text-sm text-gray-400">{count} posts</div>
      </Link>
   );
};
