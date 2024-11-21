import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logo } from "../ui/logo";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { SearchInput } from "../nav/search-input";
import { NavItem } from "../nav/nav-item";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { NavLogout } from "../nav/nav-logout";

type HomeMenuProps = {
   closeAction: () => void;
};

export const HomeMenu = ({ closeAction }: HomeMenuProps) => {
   return (
      <div className="lg:hidden fixed inset-0 p-6 bg-black">
         <div className="flex justify-between items-center">
            <Logo size={32} />
            <div
               className="cursor-pointer flex justify-center items-center size-12 rounded-full border-2 border-gray-900"
               onClick={closeAction}
            >
               <FontAwesomeIcon className="size-6" icon={faXmark} />
            </div>
         </div>
         <div className="my-6">
            <SearchInput />
         </div>
         <div>
            <NavItem href="/home" icon={faHouse} label="Página inicial" />
            <NavItem href="/profile" icon={faUser} label="Meu perfil" />
            <NavLogout />
         </div>
      </div>
   );
};
