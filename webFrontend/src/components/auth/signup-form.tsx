"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignupForm = () => {
   const router = useRouter();
   const [nameField, setNameField] = useState("");
   const [emailField, setEmailField] = useState("");
   const [passwordField, setPasswordField] = useState("");

   const handleSignup = async () => {
      try {
         const response = await axios.post("http://localhost:5000/signup", {
            name: nameField,
            email: emailField,
            password: passwordField,
         });

         if (response.status === 201) {
            toast.success("Cadastro realizado com sucesso!");
            sessionStorage.setItem("userSlug", response.data.user.slug);
            router.replace("/home");
         } else {
            console.error("Erro ao criar conta:", response.data.error.name);
            const errors = response.data.error;
            let errorMessage = "Erro ao criar conta:";
            if (errors.name) errorMessage += `\nNome: ${errors.name}`;
            if (errors.email) errorMessage += `\n ${errors.email}`;
            if (errors.password) errorMessage += `\nSenha ${errors.password}`;
            toast.error(errorMessage);
         }
      } catch (error) {
         console.error("Erro ao conectar com o servidor:", error);
         alert(error);
      }
   };

   return (
      <>
         <Input
            placeholder="Digite seu nome"
            value={nameField}
            onChange={(t) => setNameField(t)}
         />
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
         <Button label="Criar conta" onClick={handleSignup} size={1} />
         <ToastContainer />
      </>
   );
};