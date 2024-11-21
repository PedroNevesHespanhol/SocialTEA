"use client";
import { Button } from "@/components/ui/button";
import { GeneralHeader } from "@/components/ui/general-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { axiosInstance } from "@/server/api";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
   const isMe = true;
   const userData: User = {
      slug: "",
      name: "",
      avatar: "",
      cover: "",
      bio: "",
      link: ""
   }

   const [user, setUserData] = useState(userData);
   const router = useRouter();

   const uploadImage = async (file: File, type: 'avatar' | 'cover') => {
      const formData = new FormData();
      formData.append('file', file);

      try {
         const response = await axiosInstance.put(`/user/${type}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
         });

         if (response.status === 200) {
            toast.success(`${type} atualizado com sucesso!`);
            setUserData((prevUser) => ({ ...prevUser, type: response.data.type }));
         } else {
            toast.error(`Erro ao atualizar ${type}`);
         }
      } catch (error) {
         console.error(`Failed to upload ${type}`, error);
         toast.error(`Failed to upload ${type}`);
      }
   };

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

   const [name, setNameField] = useState('');
   const [bio, setBio] = useState('');
   const [link, setLink] = useState('');

   const handleSave = async () => {
      try {
         const response = await axiosInstance.put(`/user`, {
            name: name,
            bio: bio,
            link: link
         },
         {
            headers: {
               Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
         });
         if (response.status === 200) {
            toast.success("Cadastro atualizado com sucesso!");
            router.replace("/home");
         } else {
            console.error("Erro ao atualizar conta:", response.data.error.name);
            const errors = response.data.error;
            let errorMessage = "Erro ao criar conta:";
            if (errors.name) errorMessage += `\nNome: ${errors.name}`;
            if (errors.bio) errorMessage += `\n ${errors.bio}`;
            if (errors.link) errorMessage += `\nLink ${errors.link}`;
            toast.error(errorMessage);
         }
      } catch (error) {
         console.error("Failed to update profile", error);
         toast.error("Failed to update profile");
      }
   };
   return (
      <div>
         <GeneralHeader backHref="/home">
            <div className="font-regular text-lg">Editar perfil</div>
         </GeneralHeader>
         <section className="border-b-2 border-gray-900">
            <div
               className="flex justify-center items-center gap-4 bg-gray-500 h-28 bg-no-repeat bg-cover bg-center"
               style={{ backgroundImage: "url(" + user.cover + ")" }}
            >
               <label className="cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full">
                  <FontAwesomeIcon className="size-6" icon={faCamera} />
                  <input
                     type="file"
                     accept="image/*"
                     className="hidden"
                     onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                           uploadImage(file, 'cover');
                        }
                     }}
                  />
               </label>
               <div className="cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full">
                  <FontAwesomeIcon className="size-6" icon={faXmark} />
               </div>
            </div>
            <div className="-mt-12 px-6">
               <img
                  className="size-24 rounded-full"
                  src={user.avatar}
                  alt={user.name}
               />
               <div className="-mt-24 size-24 flex justify-center items-center">
               <label className="cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full">
                     <FontAwesomeIcon className="size-6" icon={faCamera} />
                     <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) {
                              uploadImage(file, 'avatar');
                           }
                     }}
                  />
                  </label>
               </div>
            </div>
         </section>
         <section className="p-6 flex flex-col gap-4">
            <label>
               <p className="text-lg text-gray-500 mb-2">Nome</p>
               <Input placeholder="Digite seu nome" value={name}
               onChange={(t) => setNameField(t)} />
            </label>
            <label>
               <p className="text-lg text-gray-500 mb-2">Bio</p>
               <Input
                  placeholder="Descreva você"
                  value={bio}
                  onChange={(t) => setBio(t)}
               />
            </label>
            <label>
               <p className="text-lg text-gray-500 mb-2">Link</p>
               <Input placeholder="Adicione um link" value={link} onChange={(t) => setLink(t)}/>
            </label>
            <Button label="Salvar alterações" onClick={handleSave} size={1} />
            <ToastContainer />
         </section>
      </div>
   );
}
