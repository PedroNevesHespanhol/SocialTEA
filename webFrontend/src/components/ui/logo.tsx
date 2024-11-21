import Link from "next/link";
import Image from "next/image";

type LogoProps = {
   size: number;
};

export const Logo = ({ size }: LogoProps) => {
   return (
      <Link href="/">
         <Image
            src={"/logo_app_autismo.png"}
            alt="sao paulo"
            width={size}
            height={size}
            quality={100}
         />
      </Link>
   );
};
