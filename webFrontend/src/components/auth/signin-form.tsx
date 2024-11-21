"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SigninForm = () => {
   const router = useRouter();
   const [emailField, setEmailField] = useState("");
   const [passwordField, setPasswordField] = useState("");

   const handleSignin = async () => {
      try {
         const response = await axios.post("http://localhost:5000/signin", {
            email: emailField,
            password: passwordField, 
         });
          if (response.status === 200) {
            sessionStorage.setItem("userSlug", response.data.user.slug);
            sessionStorage.setItem("token", response.data.token);
            console.log("userSlug", response.data.user.slug);
            router.replace("/home");
          } else {
            console.error("Erro ao fazer login:", response.data.error);
            toast.error('Email ou senha incorretos!');
          }
      } catch (error) {
         console.error("Erro ao conectar com o servidor:", error);
      }
   };

   return (
      <>
         <Input
            placeholder="Digite seu email"
            value={emailField}
            onChange={(t) => setEmailField(t)}
         />
         <Input
            placeholder="Digite sua senha"
            value={passwordField}
            onChange={(t) => setPasswordField(t)}
            password
         />
         <Button label="Entrar" onClick={handleSignin} size={1} />
         <ToastContainer />
      </>
   );
};
