import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

type GeneralHeaderProps = {
   children: React.ReactNode;
   backHref: string;
};

export const GeneralHeader = ({ backHref, children }: GeneralHeaderProps) => {
   return (
      <header className="flex gap-4 items-center p-6">
         <Link
            className="flex justify-center items-center border-2 border-gray-500 size-12 rounded-full"
            href={backHref}
         >
            <FontAwesomeIcon className="size-6" icon={faArrowLeft} />
         </Link>
         <div className="flex-1">{children}</div>
      </header>
   );
};
